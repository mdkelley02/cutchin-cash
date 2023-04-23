import React from "react";
import {
  Text,
  View,
  Sizes,
  ScreenBase,
  iconProps,
  BetterButton,
} from "../components/Themed";
import { View as DefaultView } from "react-native";
import { ExecutePayActionType } from "../store";
import { PAY_BUTTON_CONFIG, REQUEST_BUTTON_CONFIG } from "../constants/Labels";
import UserSearch from "../components/UserSearch";
import { useAppState } from "../hooks/useAppState";
import { User } from "../models/User.model";
import { useRouter } from "expo-router";
import { useExecutePay } from "../hooks/useExecutePay";
import { FontAwesome5 } from "@expo/vector-icons";

export default function UserSelect() {
  const router = useRouter();
  const { dispatchExecutePay } = useAppState();
  const { startSendPaymentFlow, startRequestPaymentFlow, executePayState } =
    useExecutePay();

  function onUserSelect(user: User) {
    executePayState.payEvent === "Request"
      ? startRequestPaymentFlow(user.userId)
      : startSendPaymentFlow(user.userId);
    router.back();
  }

  return (
    <View style={ScreenBase}>
      <DefaultView
        style={{
          justifyContent: "center",
          rowGap: Sizes.sm,
        }}
      >
        <Text type="h3">Select Pay Type</Text>
        <DefaultView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {[REQUEST_BUTTON_CONFIG, PAY_BUTTON_CONFIG].map(
            ({ payEvent, label, icon }, key) => (
              <BetterButton
                key={key}
                type="selectable"
                selected={executePayState.payEvent === payEvent}
                onPress={() =>
                  dispatchExecutePay({
                    type: ExecutePayActionType.SetPayEvent,
                    payload: payEvent,
                  })
                }
                label={label}
                style={{
                  flexBasis: "48%",
                }}
                icon={<FontAwesome5 {...iconProps(icon)} />}
              />
            )
          )}
        </DefaultView>
      </DefaultView>
      {executePayState.payEvent !== "AddFunds" && (
        <DefaultView>
          <UserSearch
            modalTitle="Select a User"
            onUserSelect={onUserSelect}
            selectedUserId={
              executePayState.payEvent === "Request"
                ? executePayState.payingUserId ?? undefined
                : executePayState.receivingUserId ?? undefined
            }
          />
        </DefaultView>
      )}
    </View>
  );
}
