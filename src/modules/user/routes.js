import { Router } from "express";
import registerUserAction from "./actions/registerUserAction.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserAction);

export default userRouter;
