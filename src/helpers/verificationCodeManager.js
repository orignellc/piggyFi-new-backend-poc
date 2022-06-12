import NodeCache from "node-cache";

const cache = new NodeCache();
const SUFFIX = "verification.key.";

export default class VerificationCodeManager {
  newCode(id, ttl = 60 * 60 * 4) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const key = SUFFIX + code;
    if (cache.has(key)) {
      return this.newCode(id, ttl);
    }

    cache.set(key, id, ttl);
    return code;
  }

  validate(code) {
    const key = SUFFIX + code;
    if (!cache.has(key)) {
      return false;
    }

    return cache.get(key);
  }
}
