import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Size, Theme } from "../../models/theme";

export type CardProps = {
  children: React.ReactNode;
  size?: Size;
} & React.ComponentProps<typeof View>;

export default function Card(props: CardProps) {
  const styleOrDefault: StyleProp<ViewStyle> = (props.style as Object) || {};

  return (
    <View
      {...props}
      style={{
        ...styleOrDefault,
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.spacing[props.size || "md"],
        padding: Theme.spacing[props.size || "md"],
      }}
    >
      {props.children}
    </View>
  );
}
