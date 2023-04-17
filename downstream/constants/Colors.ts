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
  disabledButton: string;
  disabledButtonText: string;
  link: string;
};

const dark: Palette = {
  background: "#121723",
  button: "#3A3F52",
  buttonText: "#FFFFFF",
  buttonSecondary: "#1c2130",
  buttonTextSecondary: "#C3C8D4",
  text: "#FFFFFF",
  tint: "#C3C8D4",
  card: "#1c2130",
  input: "#2a2e39",
  inputText: "#C3C8D4",
  subText: "#A4AAB9",
  disabledButton: "#2A2E39",
  disabledButtonText: "#6D7485",
  link: "#0176C3",
};

const light: Palette = {
  background: "#FFFFFF",
  button: "#1D242C",
  buttonText: "#dcdde1",
  buttonSecondary: "#FAFAFA",
  buttonTextSecondary: "#4A4A4A",
  text: "#121723",
  tint: "#1F2C3F",
  card: "#F5F5F5",
  input: "#e9e9e9",
  inputText: "#121723",
  subText: "#4A4A4A",
  disabledButton: "#D0D9E8",
  disabledButtonText: "#A4AAB9",
  link: "#121723",
};

export default {
  light,
  dark,
};
