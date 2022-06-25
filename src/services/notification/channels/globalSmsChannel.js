import TermiiSmsChannel from "./termiiSmsChannel.js";
import InfoBipSmsChannel from "./infoBip/infoBipSmsChannel.js";

export default class GlobalSmsChannel {
  static async send(user, notification) {
    if (isNigerianNumber(user.phone)) {
      return TermiiSmsChannel.send(user, notification);
    }

    return InfoBipSmsChannel.send(user, notification);
  }
}

function isNigerianNumber(phone) {
  if (typeof phone === "string") {
    return phone.startsWith("234") || phone.startsWith("+234");
  }
  if (typeof phone === "number") {
    return phone.toString().startsWith("234");
  }

  return false;
}
