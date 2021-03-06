import sendViaMobileMoneyAction from "../actions/sendViaMobileMoneyAction.js";
import {
  RESPONSE_CODE_CREATED,
  RESPONSE_CODE_PAYMENT_REQUIRED,
} from "../../../helpers/response-codes.js";
import InsufficientFundException from "../exceptions/insufficientFundException.js";

export async function create(req, res) {
  const input = getSendInput(req.body);

  try {
    const result = await sendViaMobileMoneyAction(req.user, input);
    res.status(RESPONSE_CODE_CREATED).json(result);
  } catch (e) {
    if (e instanceof InsufficientFundException) {
      res.status(RESPONSE_CODE_PAYMENT_REQUIRED).json({
        error: e.name,
        message: e.message,
        balance: e.balance,
        available_balance: e.available_balance,
        local_currency: e.local_currency,
        balance_in_local_currency: e.balance_in_local_currency,
      });
      return;
    }

    throw e;
  }
}

function getSendInput(request) {
  return {
    amount: request.amount,
    recipient: {
      phone: request.recipient.phone,
      email: request.recipient.email,
      first_name: request.recipient.first_name,
      last_name: request.recipient.last_name,
      country: request.recipient.country,
      mobile_money: {
        provider: request.recipient.mobile_money.provider,
        name: request.recipient.mobile_money.name,
        account_number: request.recipient.mobile_money.account_number,
      },
    },
  };
}
