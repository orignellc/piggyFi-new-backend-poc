import UserRecords from "../logics/UserRecords.js";
import UserWallet, {
  useDefaultUserWalletFactory,
} from "../logics/UserWallet.js";
import { useWallet } from "../../../services/umoja/index.js";
import UserJwtAuthenticator from "../logics/UserJwtAuthenticator.js";
import {
  RESPONSE_CODE_CREATED,
  RESPONSE_CODE_SUCCESS,
} from "../../../helpers/response-codes.js";
import VerificationCodeNotification from "../notifications/verificationCodeNotification.js";

export default async function loginOrRegisterUserAction(req, res) {
  const input = getRegisterInput(req.body);
  let authenticated = await new UserJwtAuthenticator().authenticate(input);

  if (authenticated !== false) {
    res.status(RESPONSE_CODE_SUCCESS).json(authenticated);
    return;
  }

  let user = await UserRecords.createNewUser(input);
  user = await useDefaultUserWalletFactory(user).createWallet();
  authenticated = await new UserJwtAuthenticator().authenticateUser(user);
  VerificationCodeNotification.instance().notify(user);

  res.status(RESPONSE_CODE_CREATED).json(authenticated);
}

function getRegisterInput(request) {
  return {
    last_name: request.last_name,
    first_name: request.first_name,
    name: request.name,
    username: request.username,
    email: request.email,
    identifier:
      request.identifier || request.email || request.phone || request.username,
    phone: request.phone,
    country_code: request.country_code,
    password: request.password,
    type: request.type,
  };
}
