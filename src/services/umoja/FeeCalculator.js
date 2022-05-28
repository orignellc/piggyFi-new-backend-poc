import CurrencyConverter from "./CurrencyConverter.js";

export default class FeeCalculator {
  #hundredUsdInCurrency = {};
  #amount;

  constructor(amount, hundredUsdInCurrency) {
    this.#hundredUsdInCurrency = hundredUsdInCurrency;
    this.#amount = amount;
  }

  getFee() {
    if (this.#hundredUsdInCurrency < this.#amount) {
      return 0.027 * this.#amount;
    }

    return 0.016 * this.#amount;
  }

  getFeePlusAmount() {
    return this.getFee() + this.#amount;
  }
}
