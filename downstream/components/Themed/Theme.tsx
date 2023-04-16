import { useColorScheme } from "react-native";
import Colors, { Palette } from "../../constants/Colors";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export const DefaultScheme = "dark";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof Palette
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useColor() {
  const colorScheme = useColorScheme() ?? DefaultScheme;
  return Colors[colorScheme] as Palette;
}
