import Notification from "../../../services/notification/notification.js";
import VerificationCodeManager from "../../../helpers/verificationCodeManager.js";
import GlobalSmsChannel from "../../../services/notification/channels/globalSmsChannel.js";

export default class VerificationCodeNotification extends Notification {
  via = [GlobalSmsChannel];
  #verificationCode;

  constructor(verificationCode) {
    super();
    this.#verificationCode = verificationCode;
  }

  toSMS(user) {
    const code = this.#verificationCode.newCode(user.id);
    console.log(code);
    return `Verification Code: ${code}. Do not share with anyone`;
  }

  static instance() {
    return new VerificationCodeNotification(new VerificationCodeManager());
  }
}
