import * as crypto from "crypto";

export class CryptoUtil {
  /**
   * Generates a secure random token string of specified length (in bytes).
   */
  static generateRandomToken(bytes = 32): string {
    return crypto.randomBytes(bytes).toString("hex");
  }

  /**
   * Generates an SHA-256 hash of a given input string.
   */
  static hashString(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
  }

  /**
   * Securely compares two strings in constant time to prevent timing attacks.
   */
  static secureCompare(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);

    if (bufA.length !== bufB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufA, bufB);
  }
}
