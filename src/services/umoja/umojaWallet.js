import { getCountryCodeCurrency } from "../../helpers/currency.js";
import CurrencyConverter from "./CurrencyConverter.js";
import FeeCalculator from "./FeeCalculator.js";

export const WITHDRAW_TYPE_MOBILE_MONEY = "Mobile money";
export const WITHDRAW_TYPE_CRYPTO = "Crypto";

export const MOBILE_MONEY_PROVIDER_MPESA = "M-PESA";
export const MOBILE_MONEY_PROVIDER_MONCASH = "Moncash";
export const MOBILE_MONEY_PROVIDER_AIRTEL = "Airtel";
export const MOBILE_MONEY_PROVIDER_MTN_MONEY = "MTN Money";

export const MOBILE_MONEY_PROVIDERS = [
  MOBILE_MONEY_PROVIDER_MPESA,
  MOBILE_MONEY_PROVIDER_MONCASH,
  MOBILE_MONEY_PROVIDER_AIRTEL,
  MOBILE_MONEY_PROVIDER_MTN_MONEY,
];

export default class UmojaWallet {
  http;
  userWallet;

  constructor(userWallet, http) {
    this.http = http;
    this.userWallet = userWallet;
  }

  getProviderName() {
    return "umoja";
  }

  async create({ phone, first_name, last_name, country_code }) {
    const currency = getCountryCodeCurrency(country_code);
    const requestBody = {
      create_account: true,
      phone_number: phone,
      first_name: first_name || ".",
      last_name: last_name || ".",
      sex: "m",
      age_range: "1",
      pin_code: "123456",
      currency: currency,
      language: "English",
      user_type: "Mobile",
    };
    const { data } = await this.http.post("/users/", requestBody);
    const umojaWallet = await this.#findByWalletId(data.account);

    return {
      user_id: data.id,
      wallet_id: umojaWallet.id,
      balance_in_local_currency: umojaWallet.balance,
      balance: umojaWallet.usd_balance,
      available_balance: umojaWallet.usd_balance,
      address: umojaWallet.public_address,
      locked: umojaWallet.locked,
      local_currency: currency,
    };
  }

  async details() {
    const wallet = await this.#findByWalletId(this.userWallet.wallet_id);

    this.userWallet.balance_in_local_currency = wallet.balance;
    this.userWallet.balance = wallet.usd_balance;
    this.userWallet.available_balance =
      wallet.usd_balance - wallet.frozen_usd_balance;
    this.userWallet.locked = wallet.locked;

    return this.userWallet;
  }

  async withdraw(amount, recipient, type) {
    let input;
    if (type === WITHDRAW_TYPE_MOBILE_MONEY) {
      input = {
        amount,
        withdraw_type: WITHDRAW_TYPE_MOBILE_MONEY,
        user_full_name: `${recipient.first_name} ${recipient.last_name}`,
        user_email: recipient.email,
        user_phone_number: recipient.phone,
        user_account_name: recipient.mobile_money.name,
        mobile_money_provider: recipient.mobile_money.provider,
        mobile_money_account_number: recipient.mobile_money.account_number,
      };
    }

    const { data } = await this.http.post(
      `wallets/${this.userWallet.wallet_id}/withdraws/`,
      input
    );

    // const feeData = await this.#withdrawFeeForAmount(amount);

    return {
      type: "debit",
      channel: type,
      currency: data.currency,
      status: data.status,
      amount: data.usd_amount,
      local_amount: data.amount,
      // fee_amount: feeData.usd_amount,
      // fee_local_amount: feeData.amount,
      provider: {
        name: this.getProviderName(),
        transaction_id: data.id,
        wallet_id: data.account.id,
        user_id: data.account.user.id,
        data: {
          // fee_data: feeData,
          transfer_data: data,
        },
      },
      recipient,
    };
  }

  async updateKYC(fields) {
    const { data } = await this.http.patch(
      `users/${this.userWallet.user_id}/`,
      fields
    );
    return data;
  }

  async #withdrawFeeForAmount(amount) {
    const feeCalculator = await this.#makeFeeCalculator(
      amount,
      this.userWallet.local_currency
    );

    const { data } = await this.http.post(
      `wallets/${this.userWallet.wallet_id}/withdraws/`,
      {
        amount: feeCalculator.getFee(),
        withdraw_type: WITHDRAW_TYPE_CRYPTO,
        crypto_address: process.env.UMOJA_MASTER_WALLET_ADDRESS,
      }
    );

    return data;
  }

  async #makeFeeCalculator(amount, currency) {
    const hundredUsdInCurrency = await new CurrencyConverter().convert(
      100,
      "USD",
      currency
    );
    return new FeeCalculator(amount, hundredUsdInCurrency);
  }

  async #findByWalletId(id) {
    const { data } = await this.http.get(`/wallets/${id}`);
    return data;
  }
}
