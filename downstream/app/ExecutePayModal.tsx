import { Button, Text, View, useColor } from "../components/Themed";
import { ModalBase, Sizes } from "../components/Themed";
import { useNavigation } from "expo-router";
import { Routes } from "../constants/Routes";
import { findUser, formatAmount } from "../models/Utils";
import { View as DefaultView } from "react-native";
import { useAppState } from "../hooks/useAppState";
import { ExecutePayState, PayEvent } from "../store";

const EventToLabel: Record<PayEvent, string> = {
  Request: "Request",
  Pay: "Pay",
  AddFunds: "Add Funds",
} as const;

export default function ExecutePayModal(props: any) {
  const { payViewState, executePayState, appDataState } = useAppState();
  const payingUser = findUser(appDataState.users, executePayState.payingUserId);
  const receivingUser = findUser(
    appDataState.users,
    executePayState.receivingUserId
  );
  const navigation = useNavigation();
  const colors = useColor();

  if (Object.values(executePayState).some((s) => s == null)) {
    navigation.goBack();
  }

  return (
    <View style={ModalBase}>
      <DefaultView
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90%",
        }}
      >
        <DefaultView style={{ rowGap: Sizes.lg }}>
          <DefaultView style={{ rowGap: Sizes.xxs }}>
            <Text type="h1">
              Confirm {EventToLabel[executePayState.payEvent!]}
            </Text>
            <Text type="p">
              $
              {formatAmount(
                payViewState.payAmount.whole,
                payViewState.payAmount.fraction ?? 0
              )}
            </Text>
          </DefaultView>
          <View style={{ rowGap: Sizes.sm }}>
            <DefaultView style={{ rowGap: Sizes.xxs }}>
              <Text type="h4">Paying</Text>
              <Text>{payingUser!.displayName}</Text>
            </DefaultView>
            <DefaultView style={{ rowGap: Sizes.xxs }}>
              <Text type="h4">Receiving</Text>
              <Text>{receivingUser!.displayName}</Text>
            </DefaultView>
          </View>
        </DefaultView>
        <View
          style={{
            flexDirection: "row",
            gap: Sizes.sm,
            justifyContent: "center",
          }}
        >
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>Cancel</Text>
          </Button>
          <Button
            style={{
              backgroundColor: colors.buttonSecondary,
            }}
          >
            <Text>Approve</Text>
          </Button>
        </View>
      </DefaultView>
    </View>
  );
}
