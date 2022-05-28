import sendAction from "../actions/sendAction.js";
import { RESPONSE_CODE_CREATED } from "../../../helpers/response-codes.js";

export async function create(req, res) {
  const input = getSendInput(req.body);

  const result = await sendAction(req.user, input);

  res.status(RESPONSE_CODE_CREATED).json(result);
}

function getSendInput(request) {
  return {
    amount: request.amount,
    recipient: {
      phone: request.recipient.phone,
      first_name: request.recipient.first_name,
      last_name: request.recipient.last_name,
      mobile_money: {
        provider: request.recipient.mobile_money.provider,
        name: request.recipient.mobile_money.name,
        account_number: request.recipient.mobile_money.account_number,
      },
    },
  };
}