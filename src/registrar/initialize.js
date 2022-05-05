import { registerRoutes } from "./registerRoutes.js";
import { registerPlugins } from "./registerPlugins.js";
import { connectDatabase } from "../services/database/database.js";

export function initialize(app) {
  registerPlugins(app);
  registerRoutes(app);

  connectDatabase();
}
