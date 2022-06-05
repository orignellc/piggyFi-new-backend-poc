import Joi from "joi";
import JoiPhoneNumber from "joi-phone-number";

export default async function userUpdateOrCreateValidationSchema(req) {
  const PhoneJoi = Joi.extend(JoiPhoneNumber);

  const userWaller = useDefaultUserWalletFactory(req.user);
  await userWaller.syncBalanceAndGetDetails();
  const wallet = userWaller.getUserProviderWallet();

  return Joi.object({
    amount: Joi.number().required().max(wallet.balance_in_local_currency),
    recipient: {
      phone: PhoneJoi.string().phoneNumber({ defaultCountry: "NG" }).required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      mobile_money: Joi.object()
        .required()
        .keys({
          provider: Joi.string()
            .required()
            .valid(...MOBILE_MONEY_PROVIDERS),
          name: Joi.string().required(),
          account_number: Joi.string().required(),
        }),
    },
  });
}
