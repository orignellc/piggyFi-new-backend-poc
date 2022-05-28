import UserRecords from "../logics/UserRecords.js";
import {
  RESPONSE_CODE_NOT_FOUND,
  RESPONSE_CODE_SUCCESS,
} from "../../../helpers/response-codes.js";

export default async function (req, resp) {
  const user = await UserRecords.findCustomerByEmailOrUsername(
    req.params.identifier
  );

  if (!user) {
    resp
      .status(RESPONSE_CODE_NOT_FOUND)
      .json({ status: "error", message: "customer not found" });
    return;
  }

  resp.status(RESPONSE_CODE_SUCCESS).json({ user: transform(user) });
}

function transform(user) {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    countryCode: user.countryCode,
  };
}
