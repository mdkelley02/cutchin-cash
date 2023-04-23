import { Button, View as DefaultView } from "react-native";
import React from "react";
import {
  ScreenBase,
  Text,
  View,
  Field,
  useColor,
  BetterButton,
  Sizes,
  Card,
  iconProps,
} from "../components/Themed";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useAppState } from "../hooks/useAppState";
import { useUser } from "../hooks/useUser";
import { TransactionStatus } from "../models/Transaction.model";
import { AntDesign } from "@expo/vector-icons";

export default function TransactionDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { appDataState } = useAppState();
  const { findUser, isUserMe } = useUser();
  const transaction = appDataState.transactions.find(
    (t) => t.transactionId === params.transactionId
  );
  const palette = useColor();

  if (transaction == null) {
    router.back();
    return null;
  }

  const payingUser = findUser(transaction.payingUserId);
  if (payingUser == null) {
    router.back();
    return null;
  }
  const receivingUser = findUser(transaction.receivingUserId);
  if (receivingUser == null) {
    router.back();
    return null;
  }

  const isPayer = isUserMe(payingUser.userId);
  const isReceiver = isUserMe(receivingUser.userId);
  const canDecision =
    !isPayer && transaction.status === TransactionStatus.PENDING;
  const alreadyDecided = transaction.status !== TransactionStatus.PENDING;

  function TransactionStatusControls() {
    const buttons = Object.values(TransactionStatus);
    return (
      <DefaultView
        style={{
          rowGap: 8,
        }}
      >
        <Text type="h5">Status</Text>
        <DefaultView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {!canDecision && !alreadyDecided && <Text>Pending</Text>}
          {buttons.slice(2, buttons.length).map((status, key) => {
            return (
              <BetterButton
                key={key}
                label={status}
                type="selectable"
                disabled={alreadyDecided || isReceiver}
                selected={transaction!.status === status}
                icon={
                  transaction!.status !== status ? undefined : status ===
                    TransactionStatus.ACCEPTED ? (
                    <AntDesign {...iconProps("checkcircle")} />
                  ) : (
                    <AntDesign {...iconProps("closecircle")} />
                  )
                }
                style={{
                  flexBasis: "48%",
                }}
              />
            );
          })}
        </DefaultView>
      </DefaultView>
    );
  }

  return (
    <View style={ScreenBase}>
      <Card style={{ rowGap: Sizes.xxs, padding: Sizes.lg }}>
        <Text>Amount</Text>
        <Text type="h1">{`$${transaction.amount.whole}.${transaction.amount.fraction}`}</Text>
        {/* horizontal break */}
        <DefaultView
          style={{
            height: 1,
            backgroundColor: palette.subText,
            marginVertical: 10,
          }}
        />
        <DefaultView
          style={{
            rowGap: Sizes.xs,
          }}
        >
          <Field
            style={{
              backgroundColor: palette.card,
            }}
            title="Timestamp"
            value={new Date(transaction.timestamp).toLocaleDateString()}
          />
          <Field
            style={{
              backgroundColor: palette.card,
            }}
            title="Payer"
            value={isUserMe(payingUser.userId) ? "You" : payingUser.fullName}
          />
          <Field
            style={{
              backgroundColor: palette.card,
            }}
            title="Recipient"
            value={
              isUserMe(receivingUser.userId) ? "You" : receivingUser.fullName
            }
          />
        </DefaultView>
        {/* horizontal break */}
        <DefaultView
          style={{
            height: 1,
            backgroundColor: palette.subText,
            marginVertical: 10,
          }}
        />
        <TransactionStatusControls />
      </Card>
    </View>
  );
}
