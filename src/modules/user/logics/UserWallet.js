import UmojaWallet, {
  WITHDRAW_TYPE_MOBILE_MONEY,
} from "../../../services/umoja/umojaWallet.js";
import { useWallet as useUmojaWallet } from "../../../services/umoja/index.js";
import { TransactionModel } from "../models/transactionModel.js";
import InsufficientFundException from "../../send/exceptions/insufficientFundException.js";

export const INSUFFICIENT_FUND = "Insufficient fund";

export default class UserWallet {
  #walletProvider;
  user;

  constructor(user) {
    this.user = user;
  }
  setWalletProvider(factory) {
    this.#walletProvider = factory || new UmojaWallet();
    return this;
  }

  async createWallet() {
    const input = {
      phone: this.user.phone,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      country_code: this.user.country_code,
    };
    const wallet = await this.#walletProvider.create(input);
    this.updateOrCreateUserWallet(wallet);

    return this.user;
  }

  updateOrCreateUserWallet(wallet) {
    const providerName = this.#walletProvider.getProviderName().toLowerCase();

    if (this.user.wallets) {
      this.user.wallets[providerName] = wallet;
    } else {
      this.user.wallets = { [providerName]: wallet };
    }

    this.user.save();
  }

  async syncBalanceAndGetDetails() {
    const wallet = await this.#walletProvider.details();

    this.updateOrCreateUserWallet(wallet);

    return this.user;
  }

  async withdrawMobileMoney({ amount, recipient }) {
    this.user = await this.syncBalanceAndGetDetails();

    if (this.#walletCannotAffordInLocal(amount)) {
      throw new InsufficientFundException(this.getUserProviderWallet());
    }

    const transaction = await this.#walletProvider.withdraw(
      amount,
      recipient,
      WITHDRAW_TYPE_MOBILE_MONEY
    );

    this.user = await this.syncBalanceAndGetDetails();
    const userWallet = this.getUserProviderWallet();

    return TransactionModel.create({
      ...transaction,
      user: this.user,
      wallet_balance: {
        current: userWallet.balance,
        available: userWallet.available_balance,
        local_currency: userWallet.balance_in_local_currency,
      },
    });
  }

  getUserProviderWallet() {
    const providerName = this.#walletProvider.getProviderName().toLowerCase();
    return this.user.wallets[providerName];
  }

  #walletCannotAffordInLocal(amount) {
    const wallet = this.getUserProviderWallet();

    return wallet.balance_in_local_currency < amount;
  }

  #getWalletLocalBalance() {
    const wallet = this.getUserProviderWallet();

    return wallet.balance_in_local_currency;
  }

  async updateKYC(fields) {
    await this.#walletProvider.updateKYC(fields);
  }
}

export function useDefaultUserWalletFactory(user) {
  return new UserWallet(user).setWalletProvider(useUmojaWallet(user));
}
