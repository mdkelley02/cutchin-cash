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
  input: string;
  inputText: string;
  subText: string;
};

const dark: Palette = {
  background: "#121723",
  button: "#2a2e39",
  buttonText: "#fefeff",
  buttonSecondary: "#1c2130",
  buttonTextSecondary: "#C3C8D4",
  text: "#fefeff",
  tint: "#C3C8D4",
  card: "#1c2130",
  input: "#2a2e39",
  inputText: "#454954",
  subText: "#454954",
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
  input: "#E0E5F0",
  inputText: "#121723",
  subText: "#314468",
};

export default {
  light,
  dark,
};
