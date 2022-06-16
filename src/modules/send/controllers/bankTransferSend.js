import {
  RESPONSE_CODE_CREATED,
  RESPONSE_CODE_PAYMENT_REQUIRED,
} from "../../../helpers/response-codes.js";
import InsufficientFundException from "../exceptions/insufficientFundException.js";
import sendViaBankTransferAction from "../actions/sendViaBankTransferAction.js";

export async function create(req, res) {
  const input = getSendInput(req.body);

  try {
    const result = await sendViaBankTransferAction(req.user, input);
    res.status(RESPONSE_CODE_CREATED).json(result);
  } catch (e) {
    if (e instanceof InsufficientFundException) {
      res.status(RESPONSE_CODE_PAYMENT_REQUIRED).json({
        error: e.name,
        message: e.message,
        balance: e.balance,
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
      bank_transfer: {
        bank_name: request.recipient.bank_transfer.bank_name,
        account_name: request.recipient.bank_transfer.account_name,
        account_number: request.recipient.bank_transfer.account_number,
      },
    },
  };
}
