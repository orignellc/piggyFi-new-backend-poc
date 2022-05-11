import { Router } from "express";
import registerUserAction from "./actions/registerUserAction.js";
import loginAction from "./actions/loginAction.js";
import authenticatedUserProfileAction from "./actions/authenticatedUserProfileAction.js";
import authenticate from "../../services/authentication/middleware/authenticate.js";
import customerPublicProfileAction from "./actions/customerPublicProfileAction.js";

const UserRouter = Router();

UserRouter.route("/login").post(loginAction);
UserRouter.route("/register").post(registerUserAction);

UserRouter.route("/profile").get(authenticate, authenticatedUserProfileAction);
UserRouter.route("/:identifier/profile").get(
  authenticate,
  customerPublicProfileAction
);

export default UserRouter;
