import UserRecords from "../logics/UserRecords.js";
import UserWallet from "../logics/UserWallet.js";

export default async function (
  user,
  {
    email,
    phone,
    name,
    last_name,
    first_name,
    username,
    country_code,
    password,
    type,
  }
) {
  const fields = {
    email,
    phone,
    last_name,
    first_name,
    name,
    username,
    country_code,
    password,
    type,
  };
  const updatedUser = await new UserRecords(user).update(fields);
  await new UserWallet(updatedUser).updateKYC(fields);

  return updatedUser;
}
