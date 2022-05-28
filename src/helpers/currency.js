export const countryCurrencyMap = {
  US: "USD",
  NG: "NGN",
  GH: "GHS",
  KE: "KES",
  TZ: "TZS",
  UG: "UGX",
  RW: "FRW",
};

export function getCountryCodeCurrency(countryShortName) {
  const countryShortNameInUpperCase = countryShortName.toUpperCase();
  const currency = countryCurrencyMap[countryShortNameInUpperCase];

  if (currency === null) {
    throw new Error("Country not supported");
  }
  return currency;
}

export function getUserCurrency(user) {
  return getCountryCodeCurrency(user.country_code);
}
