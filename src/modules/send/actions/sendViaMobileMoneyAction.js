import { useDefaultUserWalletFactory } from "../../user/logics/UserWallet.js";

export default async function sendViaMobileMoneyAction(sender, input) {
  return await useDefaultUserWalletFactory(sender).withdrawMobileMoney(input);
}
