import UserVerifier from "../logics/UserVerifier.js";
import UserVerificationFailedException from "../exceptions/userVerificationFailedException.js";
import { RESPONSE_CODE_UNPRONOUNCEABLE_ENTITY } from "../../../helpers/response-codes.js";

export default async function validateVerificationCode(req, res) {
  const code = req.body.code;
  const user = req.user;

  try {
    await new UserVerifier(user).verify(code);
    res.status(200).json({ user });
  } catch (e) {
    if (e instanceof UserVerificationFailedException) {
      res.status(RESPONSE_CODE_UNPRONOUNCEABLE_ENTITY).json({
        status: "failed",
        message: e.message,
      });
    }
  }
}
