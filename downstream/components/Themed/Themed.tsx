import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  TouchableOpacity,
  TextInput as DefaultTextInput,
  Pressable,
  PressableProps,
  TouchableOpacityProps,
} from "react-native";
import { Link } from "expo-router";
import { Sizes } from "./Sizes";
import { ThemeProps, useColor, useThemeColor } from "./Theme";

export type TextProps = ThemeProps &
  DefaultText["props"] & { type?: TextType; bold?: boolean };
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & TouchableOpacity["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];

export const TextTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;
type TextType = typeof TextTypes[number];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, bold, ...otherProps } = props;
  const type = props.type ?? "p";
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const fontWeight = type !== "p" || bold === true ? "bold" : "normal";
  const fontSize = type === "p" ? 18 : 28 - 2 * TextTypes.indexOf(type);

  return (
    <DefaultText
      style={[{ color, fontSize, fontWeight }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );

  return (
    <DefaultView
      style={[{ backgroundColor, borderRadius: 8, padding: 16 }, style]}
      {...otherProps}
    />
  );
}

export function TouchableCard(props: TouchableOpacityProps) {
  const { style, onPress, ...otherProps } = props;
  const backgroundColor = useColor().card;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor,
          borderRadius: 8,
          padding: 16,
        },
      ]}
      {...otherProps}
    />
  );
}

export const BaseButtonStyles = {
  borderRadius: 8,
  padding: 16,
  alignItems: "center",
  justifyContent: "center",
} as const;

export function Button(props: ButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "button"
  );
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
          ...BaseButtonStyles,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "input"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <DefaultTextInput
      style={[
        {
          backgroundColor,
          borderRadius: 8,
          padding: Sizes.sm,
          alignItems: "center",
          justifyContent: "center",
          height: 56,
          fontSize: Sizes.md,
          color,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function Page(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
