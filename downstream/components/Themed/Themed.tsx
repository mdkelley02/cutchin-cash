import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity,
  TextInput as DefaultTextInput,
  TouchableOpacityProps,
  TextInputProps as DefaultTextInputProps,
  ViewProps,
} from "react-native";
import { Sizes } from "./Sizes";
import { ThemeProps, useColor, useThemeColor } from "./Theme";
import React, { ElementType, ReactElement } from "react";
import { ButtonWithIcon, iconProps } from "./Styles";
import { LinkProps } from "expo-router/build/link/Link";
import { Link } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export type TextProps = DefaultText["props"] & {
  type?: TextType;
  bold?: boolean;
};

export type ButtonProps = ThemeProps & TouchableOpacity["props"];

export const TextTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;
type TextType = typeof TextTypes[number];

export function Text(props: TextProps) {
  const { style, bold, ...otherProps } = props;
  const color = useColor();
  const type = props.type ?? "p";

  const fontWeight = type !== "p" || bold === true ? "bold" : "normal";
  const fontSize = type === "p" ? 18 : 28 - 2 * TextTypes.indexOf(type);

  return (
    <DefaultText
      style={[{ color: color.text, fontSize, fontWeight }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const palette = useColor();

  return (
    <DefaultView
      style={[{ backgroundColor: palette.background }, style]}
      {...otherProps}
    />
  );
}

export function Card(props: ViewProps) {
  const { style, ...otherProps } = props;
  const palette = useColor();

  return (
    <DefaultView
      style={[
        { backgroundColor: palette.card, borderRadius: 8, padding: 16 },
        style,
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

export type TextInputProps = {
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  containerStyle?: ViewProps["style"];
} & DefaultTextInputProps;

export function TextInput(props: TextInputProps) {
  const { containerStyle, style, icon, iconPosition, ...otherProps } = props;
  const color = useColor();
  const flexDirection =
    icon == null ? "row" : iconPosition === "right" ? "row" : "row-reverse";
  return (
    <DefaultView
      style={[
        {
          flexDirection,
          alignItems: props.multiline ? "flex-start" : "center",
          justifyContent: "space-between",
          backgroundColor: color.input,
          borderRadius: 8,
          padding: Sizes.sm,
          height: props.multiline ? 112 : 56,
        },
        containerStyle,
      ]}
    >
      <DefaultTextInput
        placeholderTextColor={color.inputText}
        style={[
          {
            backgroundColor: color.input,
            alignItems: "center",
            justifyContent: "center",
            fontSize: Sizes.md,
            color: color.inputText,
          },
          style,
        ]}
        onChangeText={props.onChangeText}
        {...otherProps}
      />
      {icon && React.cloneElement(icon, { color: color.inputText })}
    </DefaultView>
  );
}

export type BetterButtonProps = {
  type?: "primary" | "secondary" | "selectable";
  selected?: boolean;
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ButtonProps["style"];
} & TouchableOpacityProps;

export function BetterButton(props: BetterButtonProps) {
  const {
    type = "primary",
    selected = false,
    icon,
    label,
    onPress,
    disabled,
    style,
    ...otherProps
  } = props;
  const color = useColor();

  function matchBackgroundColor(): string {
    if (disabled && type !== "selectable") return color.disabledButton;

    switch (type) {
      case "primary":
        return color.button;
      case "secondary":
        return color.buttonSecondary;
      case "selectable":
        return selected ? color.button : color.card;
    }

    return color.button;
  }

  function matchTextColor(): string {
    if (disabled && type !== "selectable") return color.disabledButtonText;

    switch (type) {
      case "primary":
        return color.buttonText;
      case "secondary":
        return color.buttonTextSecondary;
      case "selectable":
        return selected ? color.buttonText : color.text;
    }
    return color.buttonText;
  }

  const backgroundColor = matchBackgroundColor();
  const textColor = matchTextColor();
  const iconPosition = props.iconPosition ?? "left";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor,
          ...BaseButtonStyles,
          ...(icon != null ? ButtonWithIcon : {}),
          flexDirection: iconPosition === "left" ? "row" : "row-reverse",
        },
        style,
      ]}
      {...otherProps}
    >
      {icon && React.cloneElement(icon, { color: textColor })}
      {label && (
        <Text type="h6" style={{ color: textColor }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export type InputFieldProps = {
  label: string;
} & DefaultTextInputProps;

export function InputField(props: InputFieldProps) {
  const { label, ...otherProps } = props;

  return (
    <DefaultView
      style={{
        rowGap: Sizes.xs,
      }}
    >
      <Text type="h4">{props.label}</Text>
      <TextInput {...otherProps} />
    </DefaultView>
  );
}

export type ErrorCardProps = {
  message: string;
} & ViewProps;

export function ErrorCard(props: ErrorCardProps) {
  const { message, style, ...otherProps } = props;
  const palette = useColor();

  return (
    <View
      style={[
        {
          backgroundColor: palette.error,
          padding: Sizes.sm,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: Sizes.lg,
        },
        style,
      ]}
      {...otherProps}
    >
      <FontAwesome5
        {...iconProps("exclamation-triangle", {
          color: "errorText",
        })}
      />
      <Text type="h6" style={{ color: palette.errorText }}>
        {message}
      </Text>
    </View>
  );
}

export type FieldProps = {
  title: string;
  titleProps?: TextProps;
  value: string;
  valueProps?: TextProps;
} & ViewProps;

export function Field(props: FieldProps) {
  const { title, titleProps, value, valueProps, style, ...otherProps } = props;
  const palette = useColor();

  return (
    <View
      style={[
        {
          gap: 8,
        },
        style,
      ]}
      {...otherProps}
    >
      <Text type="h5" {...titleProps}>
        {title}
      </Text>
      <Text
        style={[
          {
            color: palette.subText,
          },
          valueProps?.style,
        ]}
        {...valueProps}
      >
        {value}
      </Text>
    </View>
  );
}
