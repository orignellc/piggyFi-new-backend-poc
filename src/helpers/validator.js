import { RESPONSE_CODE_UNPRONOUNCEABLE_ENTITY } from "./response-codes.js";

export function validate(schema, fields) {
  const { error } = schema.validate(fields);

  if (!error) {
    return false;
  }

  return error.details.reduce((carry, currentValue) => {
    const key = currentValue.context.key;
    if (!carry[key]) {
      carry[key] = [];
    }

    carry[key].push(currentValue.message);
    return carry;
  }, {});
}

export default function validator(getSchema) {
  return async function (req, resp, next) {
    const schema = await getSchema(req);
    const errors = validate(schema, { ...req.body, ...req.params });

    if (errors === false) {
      next();
      return;
    }
    resp.status(RESPONSE_CODE_UNPRONOUNCEABLE_ENTITY).json(errors);
  };
}
