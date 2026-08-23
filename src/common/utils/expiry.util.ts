import { BadRequestException } from "@nestjs/common";

/**
 * Calculates exact 24-hour grace period expiry based on official deadline.
 */
export function computeExpiry(deadline?: Date | string | null): Date | null {
  if (!deadline) return null;

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    throw new BadRequestException("Invalid deadline date format provided");
  }

  // Exact 24-hour buffer (24 * 60 * 60 * 1000 ms)
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}
