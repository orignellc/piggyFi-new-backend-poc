import axios from "axios";
import ExceptionInvalidNotification from "../../exceptions/ExceptionInvalidNotification.js";

export default class InfoBipSmsChannel {
  static async send(user, notification) {
    if (!(notification && notification.toSMS)) {
      throw new ExceptionInvalidNotification();
    }

    const config = {
      params: {
        username: process.env.INFOBIP_USERNAME,
        password: process.env.INFOBIP_PASSWORD,
        from: process.env.SMS_FROM,
        to: user.phone,
        text: notification.toSMS(user),
      },
    };

    return await axios.get(
      "https://89nv13.api.infobip.com/sms/1/text/query",
      config
    );
  }
}
