import { Contract, ethers, utils, Wallet } from "ethers";
import FactoryABI from "../../resources/abis/factory.js";

const { JsonRpcProvider } = ethers.providers;

export default class FactoryContract {
  constructor(endpoint, privateKey, contractAddress) {
    this.provider = new JsonRpcProvider(endpoint || process.env.PROVIDER_URL);
    this.wallet = new Wallet(
      privateKey || process.env.MASTER_PRIVATE_KEY,
      this.provider
    );

    this.contract = new Contract(
      contractAddress || process.env.FACTORY_CONTRACT_ADDRESS,
      FactoryABI,
      this.wallet
    );
  }

  getProviderName() {
    return "Umoja";
  }

  async newCustodialWallet(ownerId) {
    const response = await this.contract.newCustodian(ownerId);
    await response.wait();

    const address = await this.contract.accounts(ownerId);
    return {
      name: "PiggyFi",
      address: address,
      balance: 0,
      available_balance: 0,
    };
  }
}
