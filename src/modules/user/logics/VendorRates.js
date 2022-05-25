import { UserModel } from "../models/userModel.js";

function validateRatesData(rates) {
  const byHasAllFields = ({ pair, sellRate, buyRate }) =>
    !(pair && sellRate && buyRate);
  if (rates.filter(byHasAllFields).length) {
    throw new Error("some rates has missing fields");
  }
}

export default class VendorRates {
  model = UserModel;

  // static init() {
  //   return new VendorRates(UserModel);
  // }

  async listVendorsThatCanSend(amount, countryCode) {
    const defaultNetwork = process.env.BLOCKCHAIN_NETWORK;
    await this.model.find({
      [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
      [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
      countryCode,
    });
  }

  async updateFor(user, rates) {
    validateRatesData(rates);

    if (user.vendor && user.vendor.rates) {
      user.vendor.rates = rates.reduce(byRateUnion, user.vendor.rates);
    } else if (user.vendor) {
      user.vendor.rates = rates;
    } else {
      user.vendor = { rates };
    }

    user.save();
  }
}

function byRateUnion(carry, rate) {
  const index = carry.findIndex((oldRate) => oldRate.pair === rate.pair);

  if (index === -1) {
    carry.push(rate);
  } else {
    carry[index] = rate;
  }

  return carry;
}
