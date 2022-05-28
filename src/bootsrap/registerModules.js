import { useSendModule } from "../modules/send/index.js";
import { useUserModule } from "../modules/user/index.js";

export function registerModules(app) {
  useUserModule(app);
  useSendModule(app);
}
