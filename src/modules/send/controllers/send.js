export function create(req, res) {}

function getRegisterInput(request) {
  return {
    name: request.name,
    username: request.username,
    email: request.email,
    phone: request.phone,
    country_code: request.country_code,
    password: request.password,
    type: request.type,
  };
}
