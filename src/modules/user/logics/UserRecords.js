import { USER_TYPE_CUSTOMER, UserModel } from "../models/userModel.js";
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

  static async findByEmailOrUsernameOrID(value) {
    let user = await this.findByEmailOrUsername(value);

    if (user) {
      return user;
    } else {
      user = await UserModel.findById(value);
    }

    return user;
  }

  static async findByEmailOrUsername(value) {
    return UserModel.findOne({
      $or: [{ email: value }, { username: value }],
    });
  }

  static async findCustomerByEmailOrUsername(value) {
    return UserModel.findOne({
      // username: value,
      $or: [{ email: value }, { username: value }],
      $and: [{ type: USER_TYPE_CUSTOMER }],
    });
  }
}
