import React from "react";
import { Text as ReactNativeText } from "react-native";
import { FontColor, Size, Theme } from "../../models/theme";

export type TextProps = {
  size?: Size;
  weight?: Size;
  color?: FontColor;
} & React.ComponentProps<typeof ReactNativeText>;

export default function Text(props: TextProps) {
  const size = Theme.fontSizes[props.size || "md"];
  const weight = Theme.fontWeights[props.weight || "md"];
  const color = props.color || Theme.colors.font;

  return (
    <ReactNativeText
      {...props}
      style={{
        color: color,
        fontSize: size,
        fontWeight: weight,
      }}
    >
      {props.children}
    </ReactNativeText>
  );
}
