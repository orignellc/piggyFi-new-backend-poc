import UserRecords from "../logics/UserRecords.js";
import { NOT_FOUND, SUCCESS } from "../../../helpers/response-codes.js";

export default async function (req, resp) {
  const user = await UserRecords.findCustomerByEmailOrUsername(
    req.params.identifier
  );

  if (!user) {
    resp
      .status(NOT_FOUND)
      .json({ status: "error", message: "customer not found" });
    return;
  }

  resp.status(SUCCESS).json({ user: transform(user) });
}

function transform(user) {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    countryCode: user.countryCode,
  };
}
