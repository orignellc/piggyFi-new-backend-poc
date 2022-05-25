// import { Wallet } from "./src/services/smartContract/src/wallet.js";
// Wallet.createCustodialWallet("534432sfddweweqrs3sswerwerdf");

import UserRecords from "./src/modules/user/logics/UserRecords.js";
import { useWallet } from "./src/services/umoja/index.js";
import UserWallet from "./src/modules/user/logics/UserWallet.js";

const user = await new UserWallet(useWallet()).createWallet({
  phone: "+234808863834234334",
  first_name: "Emmanuel",
  last_name: "Joseph",
  country_code: "NG",
});

console.log(user);
