import { SUCCESS } from "../../../helpers/response-codes.js";

export default function authenticatedUserProfileAction(req, resp) {
  resp.status(SUCCESS).json({ user: req.user });
}
