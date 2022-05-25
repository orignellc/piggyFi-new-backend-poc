import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserRecords from "../../../modules/user/logics/UserRecords.js";
import passport from "passport";

export default function (req, res, next) {
  req.app.use(passport.initialize());

  passport.use(new JwtStrategy(options, verify));
  next();
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
};

async function verify(payload, done) {
  try {
    const user = await UserRecords.findByEmailOrUsernameOrID(payload.id);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false, { message: "Server Error" });
  }
}
