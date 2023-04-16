import { Money } from "./Transaction.model";
import { User } from "./User.model";

export function formatAmount(whole: number, fraction: number): string {
  const paddedWhole = whole.toString().padStart(2, "0");
  const paddedFraction = fraction.toString().padStart(2, "0");
  return `${paddedWhole}.${paddedFraction}`;
}

export function formatDate(date: string): string {
  const dateString = new Date(date).toDateString();
  return dateString.slice(dateString.substring(0, 3).length + 1);
}

export function findUser(users: User[], userId: string | null): User | null {
  if (!userId) return null;
  const result = users.find(({ userId }) => userId === userId);
  return result ? result : null;
}
