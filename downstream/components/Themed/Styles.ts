import { Palette } from "../../constants/Colors";
import { SizeTypes, Sizes } from "./Sizes";
import { useColor } from "./Theme";

export const ModalBase = {
  gap: Sizes.lg,
  padding: Sizes.lg,
  height: "100%",
} as const;

export const ScreenBase = {
  flex: 1,
  padding: Sizes.md,
  gap: Sizes.md,
} as const;

export const ButtonWithIcon = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: Sizes.xs,
} as const;

export type IconPropsOptions = {
  size?: number;
  color?: keyof Palette;
};
export const iconProps = <T>(name: T, options?: IconPropsOptions) => {
  const palette = useColor();
  const size = options?.size || Sizes.md;
  const color = options?.color || "text";
  return {
    name,
    size,
    color: palette[color],
  } as const;
};

export const BorderRadius = {
  Button: Sizes.xs,
  Card: Sizes.xs,
  Input: Sizes.xs,
} as const;
