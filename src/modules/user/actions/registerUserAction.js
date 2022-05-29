import UserRecords from "../logics/UserRecords.js";
import { useDefaultUserWalletFactory } from "../logics/UserWallet.js";
import { RESPONSE_CODE_CREATED } from "../../../helpers/response-codes.js";

export default async function registerUserAction(req, res) {
  const input = getRegisterInput(req.body);
  let user = await UserRecords.createNewUser(input);
  user = await useDefaultUserWalletFactory(user).createWallet(user);

  res.status(RESPONSE_CODE_CREATED).json({
    status: "success",
    user,
  });
}

export function getRegisterInput(request) {
  return {
    last_name: request.last_name,
    first_name: request.first_name,
    name: request.name,
    username: request.username,
    email: request.email,
    phone: request.phone,
    country_code: request.country_code,
    password: request.password,
    type: request.type,
  };
}
