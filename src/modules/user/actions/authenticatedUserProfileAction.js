import { RESPONSE_CODE_SUCCESS } from "../../../helpers/response-codes.js";

export default function authenticatedUserProfileAction(req, resp) {
  resp.status(RESPONSE_CODE_SUCCESS).json({ user: req.user });
}
