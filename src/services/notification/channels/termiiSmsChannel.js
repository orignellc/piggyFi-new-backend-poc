import ExceptionInvalidNotification from "../exceptions/ExceptionInvalidNotification.js";
import axios from "axios";

export default class TermiiSmsChannel {
  static async send(user, notification) {
    if (!(notification && notification.toSMS)) {
      throw new ExceptionInvalidNotification();
    }

    const data = {
      username: process.env.INFOBIP_USERNAME,
      api_key: process.env.TERMII_API_KEY,
      from: process.env.SMS_FROM,
      to: user.phone,
      sms: notification.toSMS(user),
      type: "plain",
      channel: "generic",
    };

    return await axios.post("https://api.ng.termii.com/api/sms/send", data);
  }
}
