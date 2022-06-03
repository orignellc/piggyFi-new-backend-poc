import UserRecords from "../logics/UserRecords.js";
import UserWallet, {
  useDefaultUserWalletFactory,
} from "../logics/UserWallet.js";

export default async function (user, fields) {
  const updatedUser = await new UserRecords(user).update(fields);
  await useDefaultUserWalletFactory(updatedUser).updateKYC(fields);

  return updatedUser;
}
