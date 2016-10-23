import * as crypto from "crypto";

/**
 * create a password hashmai
 * @param password hash of password
 * @return {string}
 */
export function passwordHash(password: string) {
  const hash = crypto.createHash("sha1");
  hash.update(password);
  return hash.digest("hex");
}

/**
 * the security config
 * @type {{secretCode: string}}
 */
export const config = {
  secretCode: "This life is no nice I can't not do anything else but programming"
};