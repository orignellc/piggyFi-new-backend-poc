import { Router } from "express";
import { create as mobileMoneySendHandler } from "./controllers/mobileMoneySend.js";
import { create as sendViaBankTransferHandler } from "./controllers/bankTransferSend.js";
import authenticate from "../../modules/user/middleware/authenticate.js";
import mobileMoneySendValidationSchema from "./validators/mobileMoneySendValidationSchema.js";
import validator from "../../helpers/validator.js";
import bankTransferSendValidationSchema from "./validators/bankTransferSendValidationSchema.js";

const SendRouter = Router();

SendRouter.route("/mobile-money").post(
  authenticate,
  validator(mobileMoneySendValidationSchema),
  mobileMoneySendHandler
);

SendRouter.route("/bank-transfer").post(
  authenticate,
  validator(bankTransferSendValidationSchema),
  sendViaBankTransferHandler
);

export default SendRouter;
