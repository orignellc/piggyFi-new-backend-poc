import Notification from "../../../helpers/notification.js";
import SmsChannel from "../../../services/infoBip/smsChannel.js";
import VerificationCodeManager from "../../../helpers/verificationCodeManager.js";

export default class VerificationCodeNotification extends Notification {
  via = [SmsChannel];
  #verificationCode;

  constructor(verificationCode) {
    super();
    this.#verificationCode = verificationCode;
  }

  toSMS(user) {
    const code = this.#verificationCode.newCode(user.id);
    return `Verification Code: ${code}. Do not share with anyone`;
  }

  static instance() {
    return new VerificationCodeNotification(new VerificationCodeManager());
  }
}
