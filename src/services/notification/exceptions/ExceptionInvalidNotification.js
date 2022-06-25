export default class ExceptionInvalidNotification extends Error {
  constructor() {
    super("Notification should have a toSMS method");
  }
}
