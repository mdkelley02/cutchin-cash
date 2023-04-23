import { TouchableOpacity, useColorScheme } from "react-native";
import { View, Text, Sizes, BorderRadius, useColor } from "./Themed";
import React from "react";
import { View as DefaultView } from "react-native";
import { formatDate, formatAmount } from "../models/Utils";
import { Transaction } from "../models/Transaction.model";
import { useAppState } from "../hooks/useAppState";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";

export default function Transactions() {
  const { appDataState } = useAppState();
  const router = useRouter();
  const { isUserMe, findUser } = useUser();
  const palette = useColor();

  function TransactionItem({
    transactionId,
    payingUserId,
    timestamp,
    amount,
  }: Transaction) {
    const payingUser = findUser(payingUserId);
    return (
      <TouchableOpacity
        key={transactionId}
        onPress={() => {
          router.push(`TransactionDetail?transactionId=${transactionId}`);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: Sizes.lg,
          backgroundColor: palette.card,
          borderRadius: BorderRadius.Card,
        }}
      >
        <DefaultView
          style={{
            gap: Sizes.xxs,
          }}
        >
          <Text type="h5">{payingUser?.fullName?.substring(0, 15)}</Text>
          <Text
            bold={true}
            style={{
              color: palette.subText,
            }}
          >
            {formatDate(timestamp)}
          </Text>
        </DefaultView>
        <DefaultView>
          <Text bold={true}>
            {isUserMe(payingUserId) ? "-" : "+"}$
            {formatAmount(amount.whole, amount.fraction)}
          </Text>
        </DefaultView>
      </TouchableOpacity>
    );
  }

  if (appDataState.transactions.length === 0) {
    return <Text>No transactions yet</Text>;
  }

  return (
    <View
      style={{
        gap: Sizes.md,
      }}
    >
      {appDataState.transactions.map((transaction, key) => (
        <TransactionItem key={key} {...transaction} />
      ))}
    </View>
  );
}
