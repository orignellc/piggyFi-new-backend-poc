import { useDefaultUserWalletFactory } from "../../user/logics/UserWallet.js";

export default async function sendViaBankTransferAction(sender, input) {
  return await useDefaultUserWalletFactory(sender).withdrawViaBankTransfer(
    input
  );
}
