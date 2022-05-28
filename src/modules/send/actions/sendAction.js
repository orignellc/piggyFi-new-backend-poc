import { useDefaultUserWalletFactory } from "../../user/logics/UserWallet.js";

export default async function sendAction(sender, input) {
  return await useDefaultUserWalletFactory(sender).withdrawMobileMoney(input);
}
