// Inspiration:

import { StyleSheet, Platform } from "react-native";

export const Sizes = ["sm", "md", "lg"] as const;
export type Size = typeof Sizes[number];

// https://cdn.dribbble.com/userupload/6073936/file/original-a06fcadf16954921ab0006bb136244dc.jpg?compress=1&resize=1600x1200
export const Theme = {
  colors: {
    background: "#121723",
    card: "#182336",
    button: "#314468",
    buttonSecondary: "#1F2C3F",
    buttonFontSecondary: "#C3C8D4",
    font: "#fefeff",
    secondaryFont: "#5c6471",
    primary: "#3970ff",
    error: "#ff3b30",
  },
  fontSizes: {
    sm: 12,
    md: 16,
    lg: 20,
  },
  fontWeights: {
    sm: "400",
    md: "500",
    lg: "600",
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
} as const;

export type FontColor =
  | typeof Theme["colors"]["font"]
  | typeof Theme["colors"]["secondaryFont"]
  | typeof Theme["colors"]["buttonFontSecondary"]
  | typeof Theme["colors"]["error"];

export const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    color: Theme.colors.font,
    flex: 1,
  },
});
