import UserRecords from "../logics/UserRecords.js";
import { useDefaultUserWalletFactory } from "../logics/UserWallet.js";
import UserJwtAuthenticator from "../logics/UserJwtAuthenticator.js";
import {
  RESPONSE_CODE_CREATED,
  RESPONSE_CODE_SUCCESS,
  RESPONSE_CODE_UNAUTHORIZED,
} from "../../../helpers/response-codes.js";
import VerificationCodeNotification from "../notifications/verificationCodeNotification.js";
import UnauthorizedException from "../exceptions/unauthorizedException.js";

export default async function loginOrRegisterUserAction(req, res) {
  const input = getRegisterInput(req.body);

  try {
    const authenticated = await new UserJwtAuthenticator().authenticate(input);

    if (authenticated !== false) {
      res.status(RESPONSE_CODE_SUCCESS).json(authenticated);
    }
  } catch (e) {
    if (e instanceof UnauthorizedException && e.userDoesNotExist) {
      const authenticated = await registerUser(input);
      res.status(RESPONSE_CODE_CREATED).json(authenticated);
    } else if (
      e instanceof UnauthorizedException &&
      e.userDoesNotExist === false
    ) {
      res.status(RESPONSE_CODE_UNAUTHORIZED).json({
        message: e.message,
        type: e.name,
      });
    } else {
      throw e;
    }
  }
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

async function registerUser(input) {
  let user = await UserRecords.createNewUser(input);
  user = await useDefaultUserWalletFactory(user).createWallet();
  VerificationCodeNotification.instance().notify(user);
  return await new UserJwtAuthenticator().authenticateUser(user);
}
