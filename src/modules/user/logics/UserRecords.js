import { USER_TYPE_CUSTOMER, UserModel } from "../models/userModel.js";
import Encryptor from "../../../helpers/encrypter.js";

export default class UserRecords {
  user;

  constructor(user) {
    this.user = user;
  }

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

  update(fields) {
    Object.keys(fields)
      .filter((field) => fields[field])
      .forEach((field) => {
        this.user[field] = fields[field];
      });

    this.user.save();
    return this.user;
  }
}
