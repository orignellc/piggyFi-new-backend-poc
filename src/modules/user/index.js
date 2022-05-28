import UserRouter from "./routes.js";

export function useUserModule(app) {
  app.use("/api/users", UserRouter);
}
