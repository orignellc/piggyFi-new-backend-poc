import SendRouter from "./routes.js";

export function useSendModule(app) {
  app.use("/api/send", SendRouter);
}
