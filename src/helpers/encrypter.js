import bcrypt from "bcryptjs";

export default class Encryptor {
  static encrypt(password) {
    return bcrypt.hashSync(password);
  }

  static compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
