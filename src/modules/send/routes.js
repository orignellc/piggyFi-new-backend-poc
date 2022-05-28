import { Router } from "express";
import { create as mobileMoneySendHandler } from "./controllers/mobileMoneySend.js";
import authenticate from "../../modules/user/middleware/authenticate.js";

const SendRouter = Router();

SendRouter.route("/mobile-money").post(authenticate, mobileMoneySendHandler);

export default SendRouter;
