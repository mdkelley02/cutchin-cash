import React from "react";
import {
  Text,
  View,
  Sizes,
  ScreenBase,
  useColor,
  iconProps,
  ButtonWithIcon,
  BetterButton,
  BorderRadius,
} from "../../components/Themed";
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Routes } from "../../constants/Routes";
import { PayViewActionType } from "../../store";
import { useAppState } from "../../hooks/useAppState";
import {
  PayEventToButtonConfig,
  UNSELECTED_BUTTON_CONFIG,
} from "../../constants/Labels";
import { useExecutePay } from "../../hooks/useExecutePay";

type KeyButtonProps = {
  label: string | React.ReactNode;
  handler: () => void;
};

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function KeyPad() {
  const router = useRouter();
  const { payViewState, executePayState, dispatchPayView } = useAppState();
  const { getReceivingUser, getPayingUser } = useExecutePay();
  const color = useColor();

  function KeyPadHeader() {
    const userToDisplay =
      executePayState.payEvent === "Request"
        ? getPayingUser()
        : getReceivingUser();

    function UserSelector() {
      return (
        <TouchableOpacity
          style={ButtonWithIcon}
          onPress={() => router.push(Routes.TransactionOptions)}
        >
          {userToDisplay != null && <Text>{userToDisplay?.fullName}</Text>}
          {userToDisplay == null && <Text>Select User</Text>}
          <FontAwesome5
            {...iconProps("chevron-right", {
              size: Sizes.sm,
            })}
            weight=""
          />
        </TouchableOpacity>
      );
    }

    function computedAmount() {
      const { whole, fraction } = payViewState.payAmount;
      return fraction == null ? whole : (whole + fraction / 100).toFixed(2);
    }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          rowGap: Sizes.sm,
        }}
      >
        <UserSelector />
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
        label: <Entypo {...iconProps("dot-single", { size: Sizes.xxl })} />,
        handler: () =>
          dispatchPayView({
            type: PayViewActionType.SetFractionAmount,
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
            {...iconProps("backspace")}
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
          type: PayViewActionType.SetFractionAmount,
          payload: fraction * 10 + digit,
        });
      } else {
        dispatchPayView({
          type: PayViewActionType.SetWholeAmount,
          payload: whole * 10 + digit,
        });
      }
    }

    function handleBackspace() {
      const { whole, fraction } = payViewState.payAmount;
      if (fraction != null) {
        dispatchPayView({
          type: PayViewActionType.SetFractionAmount,
          payload: fraction > 0 ? Math.floor(fraction / 10) : null,
        });
      } else if (whole > 0) {
        dispatchPayView({
          type: PayViewActionType.SetWholeAmount,
          payload: Math.floor(whole / 10),
        });
      }
    }

    function KeyButton({ label, handler }: KeyButtonProps) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: color.card,
            borderRadius: BorderRadius.Card,
            padding: 16,
            alignContent: "center",
            justifyContent: "center",
            height: 60,
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
        {KEYS.map((number, key) => (
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
    const event =
      executePayState.payEvent == null
        ? UNSELECTED_BUTTON_CONFIG
        : PayEventToButtonConfig[executePayState.payEvent];

    function isDisabled() {
      const invalidAmount =
        payViewState.payAmount.whole === 0 &&
        (payViewState.payAmount.fraction == null ||
          payViewState.payAmount.fraction === 0);

      const invalidSelectedUser =
        executePayState.receivingUserId == null ||
        executePayState.payingUserId == null;

      const invalidEventState =
        executePayState.payEvent == null ||
        (executePayState.payEvent !== "AddFunds" &&
          executePayState.receivingUserId === executePayState.payingUserId);

      return invalidAmount || invalidSelectedUser || invalidEventState;
    }

    return (
      <View
        style={{
          columnGap: Sizes.sm,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {executePayState.payEvent != null && (
          <BetterButton
            disabled={isDisabled()}
            onPress={() => {
              router.push({
                pathname: Routes.ExecutePayModal,
              });
            }}
            icon={<FontAwesome5 {...iconProps(event.icon)} />}
            label={event.label}
          />
        )}
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
