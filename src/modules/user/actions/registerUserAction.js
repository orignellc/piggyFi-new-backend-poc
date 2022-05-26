import UserRecords from "../logics/UserRecords.js";
import UserWallet, {
  useDefaultUserWalletFactory,
} from "../logics/UserWallet.js";
import { useWallet } from "../../../services/umoja/index.js";
import { CREATED } from "../../../helpers/response-codes.js";

export default async function registerUserAction(req, res) {
  const input = getRegisterInput(req.body);
  let user = await UserRecords.createNewUser(input);
  user = await useDefaultUserWalletFactory(user).createWallet(user);

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
    phone: request.phone,
    country_code: request.country_code,
    password: request.password,
    type: request.type,
  };
}
