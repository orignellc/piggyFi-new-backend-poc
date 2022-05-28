import UserJwtAuthenticator from "../logics/UserJwtAuthenticator.js";
import {
  RESPONSE_CODE_SUCCESS,
  RESPONSE_CODE_UNAUTHORIZED,
} from "../../../helpers/response-codes.js";

export default async function loginAction(req, res) {
  const authenticated = await new UserJwtAuthenticator().authenticate(req.body);

  if (authenticated === false) {
    res.status(RESPONSE_CODE_UNAUTHORIZED).json(authenticated);
  } else {
    res.status(RESPONSE_CODE_SUCCESS).json(authenticated);
  }
}
