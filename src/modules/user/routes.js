import { Router } from "express";
import registerUserAction from "./actions/registerUserAction.js";
import loginAction from "./actions/loginAction.js";
import authenticatedUserProfileAction from "./actions/authenticatedUserProfileAction.js";
import authenticate from "../../modules/user/middleware/authenticate.js";
import customerPublicProfileAction from "./actions/customerPublicProfileAction.js";
import loginOrRegisterUserAction from "./actions/loginOrRegisterUserAction.js";

const UserRouter = Router();

UserRouter.route("/login").post(loginAction);
UserRouter.route("/register").post(registerUserAction);
UserRouter.route("/loginOrRegister").post(loginOrRegisterUserAction);

UserRouter.route("/profile").get(authenticate, authenticatedUserProfileAction);
UserRouter.route("/:identifier/profile").get(
  authenticate,
  customerPublicProfileAction
);
UserRouter.route("/:identifier/profile").get(
  authenticate,
  customerPublicProfileAction
);

export default UserRouter;
