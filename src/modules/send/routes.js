import { Router } from "express";
import { create as mobileMoneySendHandler } from "./controllers/mobileMoneySend.js";
import authenticate from "../../modules/user/middleware/authenticate.js";
import mobileMoneySendValidationSchema from "./validators/mobileMoneySendValidationSchema.js";
import validator from "../../helpers/validator.js";

const SendRouter = Router();

SendRouter.route("/mobile-money").post(
  authenticate,
  validator(mobileMoneySendValidationSchema),
  mobileMoneySendHandler
);

export default SendRouter;
