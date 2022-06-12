import VerificationCodeNotification from "../notifications/verificationCodeNotification.js";
import { RESPONSE_CODE_SUCCESS } from "../../../helpers/response-codes.js";

export default async function resendVerificationCode(req, res) {
  const user = req.user;
  VerificationCodeNotification.instance().notify(user);

  res.status(RESPONSE_CODE_SUCCESS).json({ status: "ok", phone: user.phone });
}
