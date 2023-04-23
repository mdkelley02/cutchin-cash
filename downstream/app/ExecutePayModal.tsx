import {
  BetterButton,
  Field,
  Text,
  TextInput,
  View,
  useColor,
} from "../components/Themed";
import { ModalBase, Sizes } from "../components/Themed";
import { useNavigation, useRouter } from "expo-router";
import { formatAmount } from "../models/Utils";
import { View as DefaultView } from "react-native";
import { useAppState } from "../hooks/useAppState";
import { PayEventToLabel } from "../constants/Labels";
import { useExecutePay } from "../hooks/useExecutePay";
import {
  ExecutePayActionType,
  INITIAL_EXECUTE_PAY_STATE,
  INITIAL_PAY_VIEW_STATE,
  MetaActionType,
} from "../store";
import { useMemo } from "react";

export default function ExecutePayModal() {
  const router = useRouter();
  const palette = useColor();
  const { payViewState, dispatchExecutePay, dispatchPayView } = useAppState();
  const { executePayState, getPayingUser, getReceivingUser } = useExecutePay();
  if (Object.values(executePayState).some((s) => s == null)) {
    router.back();
  }
  const payingUser = getPayingUser();
  const receivingUser = getReceivingUser();
  if (payingUser == null || receivingUser == null) {
    router.back();
    return null;
  }

  function TransactionInformation() {
    const FIELDS = [
      {
        title: `Amount`,
        value: `$${formatAmount(
          payViewState.payAmount.whole,
          payViewState.payAmount.fraction ?? 0
        )}`,
      },
      {
        title: "Paying",
        value: payingUser?.fullName ?? "Unknown",
      },
      {
        title: "Receiving",
        value: receivingUser?.fullName ?? "Unknown",
      },
    ];

    return (
      <DefaultView style={{ rowGap: Sizes.lg }}>
        <DefaultView style={{ rowGap: Sizes.sm }}>
          <Text type="h2">
            Confirm {PayEventToLabel[executePayState.payEvent!]}
          </Text>
          {FIELDS.map((f, key) => (
            <Field key={key} {...f} />
          ))}
          <Text type="h6">Description</Text>
          <TextInput
            placeholder="Enter a description for this transaction."
            multiline
          />
        </DefaultView>
      </DefaultView>
    );
  }

  function TransactionControls() {
    const labels = useMemo(
      () => [
        {
          label: "Cancel",
          onPress: () => {
            dispatchExecutePay({
              type: MetaActionType.Restore,
              payload: INITIAL_EXECUTE_PAY_STATE,
            });
            dispatchPayView({
              type: MetaActionType.Restore,
              payload: INITIAL_PAY_VIEW_STATE,
            });
            router.back();
          },
        },
        {
          label: PayEventToLabel[executePayState.payEvent!],
          onPress: () => {
            dispatchExecutePay({
              type: MetaActionType.Restore,
              payload: INITIAL_EXECUTE_PAY_STATE,
            });
            dispatchPayView({
              type: MetaActionType.Restore,
              payload: INITIAL_PAY_VIEW_STATE,
            });
            router.back();
          },
        },
      ],
      []
    );
    return (
      <DefaultView
        style={{
          flexDirection: "row",
          gap: Sizes.sm,
          justifyContent: "center",
        }}
      >
        {labels.map(({ label, onPress }, key) => (
          <BetterButton
            key={key}
            onPress={onPress}
            type={key == 0 ? "secondary" : "primary"}
            style={{
              width: "40%",
            }}
            label={label}
          />
        ))}
      </DefaultView>
    );
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
        <TransactionInformation />
        <TransactionControls />
      </DefaultView>
    </View>
  );
}
