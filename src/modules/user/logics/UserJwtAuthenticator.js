import jwt from "jsonwebtoken";
import UserAuthenticator from "./UserAuthenticator.js";

export default class UserJwtAuthenticator extends UserAuthenticator {
  async authenticate({ identifier, password }) {
    const authenticated = await super.authenticate({
      identifier,
      password,
    });
    if (authenticated === false) {
      return false;
    }

    return {
      token: this.#generateJwt(),
      user: this.user,
    };
  }

  #generateJwt() {
    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = parseInt(getExpirationTimeInMS(), 10);
    const payload = {
      id: this.user._id,
    };

    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}

function getExpirationTimeInMS() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return expirationDate.getTime() / 1000;
}
