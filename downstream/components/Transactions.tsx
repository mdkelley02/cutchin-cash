import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { View, Text, Sizes, TouchableCard, DefaultScheme } from "./Themed";
import React from "react";
import { View as DefaultView } from "react-native";
import { formatDate, formatAmount } from "../models/Utils";
import { Transaction } from "../models/Transaction.model";
import { useAppState } from "../hooks/useAppState";

export default function Transactions() {
  const colorScheme = useColorScheme();
  const { appDataState, authState } = useAppState();

  function TransactionItem({
    transactionId,
    receivingUserId,
    payingUserId,
    timestamp,
    amount,
  }: Transaction) {
    const receivingUser = [...appDataState.users, authState.user].find(
      (user) => user?.userId === receivingUserId
    );
    const payingUser = [...appDataState.users, authState.user].find(
      (user) => user?.userId === payingUserId
    );
    return (
      <TouchableOpacity
        key={transactionId}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: Sizes.md,
          backgroundColor: Colors[colorScheme ?? DefaultScheme].card,
          borderRadius: 8,
        }}
      >
        <DefaultView
          style={{
            gap: Sizes.xxs,
          }}
        >
          <Text type="h5">{payingUser?.displayName}</Text>
          <Text
            bold={true}
            style={{
              color: Colors[colorScheme ?? DefaultScheme].subText,
            }}
          >
            {formatDate(timestamp)}
          </Text>
        </DefaultView>
        <DefaultView>
          <Text bold={true}>
            ${formatAmount(amount.whole, amount.fraction)}
          </Text>
        </DefaultView>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        gap: Sizes.sm,
      }}
    >
      {appDataState.transactions.length === 0 && (
        <Text>No transactions yet</Text>
      )}
      {appDataState.transactions.length > 0 &&
        appDataState.transactions.map((transaction, key) => (
          <TransactionItem key={key} {...transaction} />
        ))}
    </View>
  );
}
