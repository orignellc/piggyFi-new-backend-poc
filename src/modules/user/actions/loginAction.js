import UserJwtAuthenticator from "../logics/UserJwtAuthenticator.js";
import { SUCCESS, UNAUTHORIZED } from "../../../helpers/response-codes.js";

export default async function loginAction(req, res) {
  const authenticated = await new UserJwtAuthenticator().authenticate(req.body);

  if (authenticated === false) {
    res.status(UNAUTHORIZED).json(authenticated);
  } else {
    res.status(SUCCESS).json(authenticated);
  }
}
