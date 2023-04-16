export const SizeTypes = [
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
  "xxxl",
  "xxxxl",
] as const;
export type SizeTypes = typeof SizeTypes[number];

export const Sizes: Record<SizeTypes, number> = {
  xxs: 4,
  xs: 12,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
};
