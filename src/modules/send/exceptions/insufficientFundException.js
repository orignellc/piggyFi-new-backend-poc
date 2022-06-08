export default class InsufficientFundException extends Error {
  constructor(balance) {
    super(`insufficient fund balance is: ${balance}`);
    this.name = "InsufficientFundException";
    this.balance = balance;
  }
}
