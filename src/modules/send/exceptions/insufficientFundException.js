export default class InsufficientFundException extends Error {
  constructor({
    balance,
    balance_in_local_currency,
    local_currency,
    available_balance,
  }) {
    super(`insufficient fund balance is: ${balance}`);
    this.name = "InsufficientFundException";
    this.balance = balance;
    this.balance_in_local_currency = balance_in_local_currency;
    this.local_currency = local_currency;
    this.available_balance = available_balance;
  }
}
