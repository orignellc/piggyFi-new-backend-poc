import { UserModel } from "../models/userModel.js";
import Encryptor from "../../../helpers/encrypter.js";
import UserWallet from "./UserWallet.js";

async function createAndSetUserWallet(user) {
  const userWallet = new UserWallet(user);
  return await userWallet.createWallet();
}

export default class UserRecords {
  static async createNewUser(fields) {
    fields.password = Encryptor.encrypt(fields.password);

    const user = await UserModel.create(fields);

    return await createAndSetUserWallet(user);
  }
}
