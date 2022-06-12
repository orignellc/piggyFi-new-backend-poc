export default class UserVerificationFailedException extends Error {
  constructor() {
    super("Verification failed, kindly check and retry or resend code");
  }
}
