const tintColorLight = "#121723";
const tintColorDark = "#121723";

export type Palette = {
  background: string;
  button: string;
  buttonText: string;
  buttonSecondary: string;
  buttonTextSecondary: string;
  text: string;
  tint: string;
  card: string;
};

const dark: Palette = {
  background: "#121723",
  button: "#314468",
  buttonText: "#fefeff",
  buttonSecondary: "#1F2C3F",
  buttonTextSecondary: "#C3C8D4",
  text: "#fefeff",
  tint: "#C3C8D4",
  card: "#182336",
};

const light: Palette = {
  background: "#FFFFFF",
  button: "#98B4DA",
  buttonText: "#121723",
  buttonSecondary: "#E0E5F0",
  buttonTextSecondary: "#314468",
  text: "#121723",
  tint: "#1F2C3F",
  card: "#E0E5F0",
};

export default {
  light,
  dark,
};
