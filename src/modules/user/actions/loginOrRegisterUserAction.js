import UserRecords from "../logics/UserRecords.js";
import UserWallet from "../logics/UserWallet.js";
import { useWallet } from "../../../services/umoja/index.js";
import UserJwtAuthenticator from "../logics/UserJwtAuthenticator.js";
import { CREATED, SUCCESS } from "../../../helpers/response-codes.js";

export default async function loginOrRegisterUserAction(req, res) {
  const input = getRegisterInput(req.body);
  const authenticated = await new UserJwtAuthenticator().authenticate(req.body);

  if (authenticated !== false) {
    res.status(SUCCESS).json(authenticated);
    return;
  }

  let user = await UserRecords.createNewUser(input);
  user = await new UserWallet(useWallet()).createWallet(user);

  res.status(CREATED).json({
    status: "success",
    user,
  });
}

function getRegisterInput(request) {
  return {
    name: request.name,
    username: request.username,
    email: request.email,
    identifier: request.email || request.phone || request.username,
    phone: request.phone,
    country_code: request.country_code,
    password: request.password,
    type: request.type,
  };
}
