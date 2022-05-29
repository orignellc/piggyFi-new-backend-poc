import UserRecords from "../logics/UserRecords.js";
import updateUserProfile from "../actions/updateUserProfile.js";
import { getRegisterInput } from "../actions/registerUserAction.js";
import { RESPONSE_CODE_SUCCESS } from "../../../helpers/response-codes.js";

export default class UserProfileController {
  static update(req, resp) {
    const input = getRegisterInput(req);
    const updatedUser = updateUserProfile(req.user, input);

    return resp.status(RESPONSE_CODE_SUCCESS).json(updatedUser);
  }
}
