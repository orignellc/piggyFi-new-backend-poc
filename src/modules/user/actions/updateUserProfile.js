import UserRecords from "../logics/UserRecords.js";
import UserWallet, {
  useDefaultUserWalletFactory,
} from "../logics/UserWallet.js";
import Encryptor from "../../../helpers/encrypter.js";

export default async function (user, fields) {
  fields.password = Encryptor.encrypt(fields.password);
  const updatedUser = await new UserRecords(user).update(fields);
  await useDefaultUserWalletFactory(updatedUser).updateKYC(fields);

  return updatedUser;
}
