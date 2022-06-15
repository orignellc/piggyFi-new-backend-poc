import VerificationCodeManager from "../../../helpers/verificationCodeManager.js";
import UserVerificationFailedException from "../exceptions/userVerificationFailedException.js";

export default class UserVerifier {
  user;

  constructor(user) {
    this.user = user;
  }

  async verify(code) {
    const id = new VerificationCodeManager().validate(code);

    if (id === false || this.user.id !== id) {
      throw new UserVerificationFailedException();
    }

    this.user.setPhoneVerified();
    return true;
  }
}
