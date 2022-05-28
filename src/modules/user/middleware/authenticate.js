import passport from "passport";
import { RESPONSE_CODE_UNAUTHORIZED } from "../../../helpers/response-codes.js";

export default function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) return next(err);

    if (!user)
      return res
        .status(RESPONSE_CODE_UNAUTHORIZED)
        .json({ message: "Unauthorized Access - No Token Provided!" });

    req.user = user;

    next();
  })(req, res, next);
}
