import crypto from "node:crypto";

export const hash = {
  create(value: string) {
    return crypto.createHash("sha256").update(value).digest("hex");
  },
  verify(value: string, hash: string) {
    return hash === this.create(value);
  },
};
