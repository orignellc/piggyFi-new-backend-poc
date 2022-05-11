import UserRecords from "../logics/UserRecords.js";

export default async function registerUserAction(req, res) {
  const input = getRegisterInput(req.body);
  const user = await UserRecords.createNewUser(input);

  res.status(200).json({
    status: "success",
    user,
  });
}

function getRegisterInput(request) {
  return {
    name: request.name,
    username: request.username,
    email: request.email,
    phone: request.phone,
    countryCode: request.countryCode,
    password: request.password,
    type: request.type,
  };
}
