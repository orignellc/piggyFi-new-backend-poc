import UmojaWallet from "./umojaWallet.js";
import axios from "axios";
import UserWallet from "../../modules/user/logics/UserWallet.js";

export function useWallet(user) {
  const http = axios.create({
    baseURL: process.env.UMOJA_BASE_URL,
    headers: {
      Authorization: `Api-Key ${
        process.env.UMOJA_API_KEY || "CPfvia7Z.vA2kN6v6ujVRFU1HnOPbHN5aXKKfiWQ9"
      }`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return new UmojaWallet(user.wallets.umoja, http);
}
