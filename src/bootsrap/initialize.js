import { registerModules } from "./registerModules.js";
import { registerPlugins } from "./registerPlugins.js";
import { connectDatabase } from "../services/database/database.js";

export function initialize(app) {
  connectDatabase();

  registerPlugins(app);
  registerModules(app);
}
