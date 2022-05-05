import { Contract, ethers, utils, Wallet as EthersWallet } from "ethers";

const { JsonRpcProvider } = ethers.providers;
const PRIVATE_KEY =
  "0x1b1e6dbb0b45151d58250af8072276897341abe8ef9145145415df75bd3f3bc8";

export class Wallet {
  static async createCustodialWallet(ownerId) {
    const masterWallet = new EthersWallet(PRIVATE_KEY, provider);
    const address = "0x5eEF230c393d9d22AE0cA35459601cfe67aFFE43";
    const factoryContract = new Contract(address, FactoryABI, masterWallet);

    const response = await factoryContract.newCustodian(ownerId);
    await response.wait();

    return await factoryContract.accounts(ownerId);
  }
}
