export default class Notification {
  via = [];

  notify(user) {
    this.via.forEach((channel) => channel.send(user, this));
  }
}
