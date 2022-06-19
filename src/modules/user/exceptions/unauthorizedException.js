export default class UnauthorizedException extends Error {
  userDoesNotExist = false;

  constructor(message, userDoesNotExist = false) {
    super(message);
    this.userDoesNotExist = userDoesNotExist;
  }
}
