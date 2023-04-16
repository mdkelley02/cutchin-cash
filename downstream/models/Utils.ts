export function formatAmount(whole: number, fraction: number): string {
  const paddedWhole = whole.toString().padStart(2, "0");
  const paddedFraction = fraction.toString().padStart(2, "0");
  return `${paddedWhole}.${paddedFraction}`;
}

export function formatDate(date: string): string {
  const dateString = new Date(date).toDateString();
  return dateString.slice(dateString.substring(0, 3).length + 1);
}
