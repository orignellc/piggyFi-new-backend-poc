import UserRouter from "../modules/user/routes.js";

export function registerRoutes(app) {
  app.use("/api/users", UserRouter);
}
