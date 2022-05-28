import axios from "axios";
import { countryCurrencyMap } from "../../helpers/currency.js";
import NodeCache from "node-cache";

const Cache = new NodeCache();

export default class CurrencyConverter {
  async convert(amount, fromCurrency, toCurrency) {
    const rates = await this.#getRates(fromCurrency);

    return amount * rates[toCurrency];
  }

  async #getRates(base) {
    const cacheKey = getCacheKey(base);

    if (Cache.has(cacheKey)) {
      return Cache.get(cacheKey);
    }

    return await this.#getRatesFromApi(base, cacheKey);
  }

  async #getRatesFromApi(base) {
    const currency = Object.values(countryCurrencyMap).join(",");
    const { data } = await axios.get(
      `https://api.apilayer.com/fixer/latest?symbols=${currency}&base=${base}`,
      {
        headers: {
          apikey:
            process.env.APILAYER_API_KEY || "UHkpPcmvCBbgrIjyhJLvtW37YIPi0yz3",
        },
      }
    );

    Cache.set(getCacheKey(base), data.rates, 60 * 60 * 2);
    return data.rates;
  }
}

function getCacheKey(base) {
  return `umoja_currency_rate_${base}`;
}
