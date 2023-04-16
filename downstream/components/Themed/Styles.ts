import { Sizes } from "./Sizes";

export const ModalBase = {
  gap: Sizes.md,
  padding: Sizes.md,
  height: "100%",
} as const;

export const ScreenBase = {
  flex: 1,
  padding: Sizes.md,
  gap: Sizes.md,
};
