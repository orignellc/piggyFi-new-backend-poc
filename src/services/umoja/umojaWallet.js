import { countryCurrencyMap } from "../../helpers/currency.js";

export default class UmojaWallet {
  http;

  constructor(http) {
    this.http = http;
  }

  getProviderName() {
    return "umoja";
  }

  async create({ phone, first_name, last_name, country_code }) {
    const currency = countryCurrencyMap[country_code] || "cUSD";
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
    const umojaWallet = await this.findById(data.account);

    return {
      user_id: data.id,
      wallet_id: umojaWallet.id,
      balance_in_local_currency: umojaWallet.balance,
      balance: umojaWallet.usd_balance,
      available_balance: umojaWallet.usd_balance,
      address: umojaWallet.public_address,
    };
  }

  async findById(id) {
    const { data } = await this.http.get(`/wallets/${id}`);
    return data;
  }

  async walletForUser(user) {
    const { data } = await this.http.get(
      `/wallets/${user.wallet.umoja.wallet_id}`
    );

    return data;
  }
}
