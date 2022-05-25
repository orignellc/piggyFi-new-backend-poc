import FactoryContract from "../../../services/smartContract/src/contracts/factoryContract.js";
import UmojaWallet from "../../../services/umoja/umojaWallet.js";

export default class UserWallet {
  wallet;

  constructor(factory) {
    this.wallet = factory || new UmojaWallet();
  }

  async createWallet(user) {
    const input = {
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      country_code: user.country_code,
    };
    const wallet = await this.wallet.create(input);
    const providerName = this.wallet.getProviderName().toLowerCase();

    if (user.wallets) {
      user.wallets[providerName] = wallet;
    } else {
      user.wallets = { [providerName]: wallet };
    }

    user.save();

    return user;
  }
}
