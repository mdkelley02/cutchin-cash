import React from "react";
import {
  Text,
  View,
  Button,
  Sizes,
  ScreenBase,
  useColor,
} from "../../components/Themed";
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Events, Routes } from "../../constants/Routes";
import { PayEvent, PayViewType } from "../../store";
import { EventsTolabel } from "../../models/Transalations";
import { findUser } from "../../models/Utils";
import { useAppState } from "../../hooks/useAppState";
import { Palette } from "../../constants/Colors";

type KeyButtonProps = {
  label: string | React.ReactNode;
  handler: () => void;
};

const KEY_PADS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PAY_EVENTS: PayEvent[] = ["Pay", "Request", "AddFunds"];

export default function KeyPad() {
  const router = useRouter();
  const { payViewState, executePayState, appDataState, dispatchPayView } =
    useAppState();
  const color = useColor();

  function KeyPadHeader() {
    function computedAmount() {
      const { whole, fraction } = payViewState.payAmount;
      return fraction == null ? whole : (whole + fraction / 100).toFixed(2);
    }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          type="h1"
          style={{
            fontSize: Sizes.xxxl,
          }}
        >
          ${computedAmount()}
        </Text>
      </View>
    );
  }

  function KeyPadButtons() {
    const KEY_PAD_BOTTOM_ROW = [
      {
        label: <Entypo name="dot-single" size={Sizes.xl} color={color.text} />,
        handler: () =>
          dispatchPayView({
            type: PayViewType.SetFractionAmount,
            payload: 0,
          }),
      },
      {
        label: "0",
        handler: () => handleAmount(0),
      },
      {
        label: (
          <FontAwesome5
            name="backspace"
            size={Sizes.md}
            color={color.text}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        ),
        handler: () => handleBackspace(),
      },
    ];

    function handleAmount(digit: number) {
      const { whole, fraction } = payViewState.payAmount;
      if (fraction != null) {
        if (fraction > 9) return;
        dispatchPayView({
          type: PayViewType.SetFractionAmount,
          payload: fraction * 10 + digit,
        });
      } else {
        dispatchPayView({
          type: PayViewType.SetWholeAmount,
          payload: whole * 10 + digit,
        });
      }
    }

    function handleBackspace() {
      const { whole, fraction } = payViewState.payAmount;
      if (fraction != null) {
        dispatchPayView({
          type: PayViewType.SetFractionAmount,
          payload: fraction > 0 ? Math.floor(fraction / 10) : null,
        });
      } else if (whole > 0) {
        dispatchPayView({
          type: PayViewType.SetWholeAmount,
          payload: Math.floor(whole / 10),
        });
      }
    }

    function KeyButton({ label, handler }: KeyButtonProps) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: color.buttonSecondary,
            borderRadius: 8,
            padding: 16,
            alignContent: "center",
            justifyContent: "center",
            flexBasis: "30%",
          }}
          onPress={handler}
        >
          <Text
            style={{ textAlign: "center" }}
            type="h5"
            key={label?.toString()}
          >
            {label}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: Sizes.sm,
        }}
      >
        {KEY_PADS.map((number, key) => (
          <KeyButton
            key={key}
            label={number.toString()}
            handler={() => handleAmount(number)}
          />
        ))}
        {KEY_PAD_BOTTOM_ROW.map((key, index) => (
          <KeyButton key={index} label={key.label} handler={key.handler} />
        ))}
      </View>
    );
  }

  function KeyPadControls() {
    const events =
      executePayState.payEvent == null
        ? [Events.Pay]
        : [executePayState.payEvent];

    return (
      <View
        style={{
          columnGap: Sizes.sm,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {events.map((type, key) => (
          <Button
            key={key}
            style={{ width: 120 }}
            onPress={() => {
              router.push({
                pathname: Routes.ExecutePayModal,
              });
            }}
          >
            <Text type="h5">{EventsTolabel[type]}</Text>
          </Button>
        ))}
      </View>
    );
  }

  return (
    <View
      style={[
        ScreenBase,
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          rowGap: Sizes.xxl,
        },
      ]}
    >
      <KeyPadHeader />
      <KeyPadButtons />
      <KeyPadControls />
    </View>
  );
}
