import UmojaWallet from "./umojaWallet.js";
import axios from "axios";

export function useWallet() {
  const http = axios.create({
    baseURL: "https://money-api.staging.umoja.money",
    headers: {
      Authorization: `Api-Key ${
        process.env.UMOJA_API_KEY || "CPfvia7Z.vA2kN6v6ujVRFU1HnOPbHN5aXKKfiWQ9"
      }`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return new UmojaWallet(http);
}
