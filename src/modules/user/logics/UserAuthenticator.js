import UserRecords from "./UserRecords.js";
import UnauthorizedException from "../exceptions/unauthorizedException.js";

export default class UserAuthenticator {
  user;

  async authenticate({ identifier, password }) {
    if (!identifier) {
      throw new Error("identifier not set");
    }
    this.user = await UserRecords.findByPhoneEmailOrUsername(identifier);

    if (!this.user) {
      throw new UnauthorizedException("user does not exist", true);
    }

    if (!this.user.matchPassword(password)) {
      throw new UnauthorizedException("password does not match");
    }

    return this.user;
  }
}
