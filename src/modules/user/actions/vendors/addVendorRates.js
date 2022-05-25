import { validEmail } from "../../../../helpers/string.js";

export default function addVendorRates(req, resp) {
  const input = getInput(req.body);
  const
}

function getInput(reqBody) {
  if (!Array.isArray(reqBody)) {
    reqBody = [reqBody];
  }

  return reqBody.map((rateObj) => ({
    currency: rateObj.pair,
    sellRate: rateObj.sellRate,
    buyRate: rateObj.buyRate,
  }));
}
