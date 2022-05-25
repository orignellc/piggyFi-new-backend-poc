import UserRecords from "./UserRecords.js";

export default class UserAuthenticator {
  user;

  async authenticate({ identifier, password }) {
    this.user = await UserRecords.findByPhoneEmailOrUsername(identifier);

    const isValidCredentials = this.user && this.user.matchPassword(password);

    if (!isValidCredentials) {
      return false;
    }

    return this.user;
  }
}
