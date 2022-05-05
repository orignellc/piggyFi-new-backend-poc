import FactoryContract from "../../../services/smartContract/src/contracts/factoryContract.js";
import { UserModel } from "../models/userModel.js";

export default class UserWallet {
  blockchainNetwork = process.env.BLOCKCHAIN_NETWORK;

  constructor(user) {
    this.user = user;
    this.factoryContract = new FactoryContract();
  }

  async createWallet() {
    const address = await this.factoryContract.newCustodialWallet(this.user.id);

    const wallet = {
      name: "BSC",
      walletAddress: address,
      balance: 0,
      availableBalance: 0,
    };

    if (this.user.wallets) {
      this.user.wallets[this.blockchainNetwork] = wallet;
    } else {
      this.user.wallets = { [this.blockchainNetwork]: wallet };
    }

    this.user.save();

    return this.user;
  }
}
