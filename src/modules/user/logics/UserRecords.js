import { USER_TYPE_CUSTOMER, UserModel } from "../models/userModel.js";
import Encryptor from "../../../helpers/encrypter.js";
import UserWallet from "./UserWallet.js";

async function createAndSetUserWallet(user) {
  const userWallet = new UserWallet();
  return await userWallet.createWallet(user);
}

export default class UserRecords {
  static async createNewUser(fields) {
    fields.password = Encryptor.encrypt(fields.password);
    return await UserModel.create(fields);
  }

  static async findByEmailOrUsernameOrID(value) {
    let user = await this.findByPhoneEmailOrUsername(value);

    if (user) {
      return user;
    } else {
      user = await UserModel.findById(value);
    }

    return user;
  }

  static async findByPhoneEmailOrUsername(value) {
    return UserModel.findOne({
      $or: [{ email: value }, { username: value }, { phone: value }],
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
