import { View } from "react-native";
import React from "react";
import { Button, Card, Sizes, Text } from "./Themed";
import { formatAmount } from "../models/Utils";
import { useRouter } from "expo-router";
import { Events, Routes } from "../constants/Routes";
import { ExecutePayType } from "../store";
import { useAppState } from "../hooks/useAppState";
import { useExecutePay } from "../hooks/useExecutePay";

export default function Balance() {
  const router = useRouter();
  const { authState } = useAppState();
  const { startAddFundsFlow } = useExecutePay();

  function BalanceInformation() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>Cash Balance</Text>
          <Text type="h1">
            $
            {formatAmount(
              authState.user?.balance?.whole ?? 0,
              authState.user?.balance?.fraction ?? 0
            )}
          </Text>
        </View>
      </View>
    );
  }

  function BalanceControls() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: Sizes.sm,
        }}
      >
        <Button
          onPress={() => {
            router.push(Routes.Pay);
            startAddFundsFlow();
          }}
        >
          <Text type="h6">Add Cash</Text>
        </Button>
        <Button onPress={() => router.push(Routes.Pay)}>
          <Text type="h6">Cash Out</Text>
        </Button>
      </View>
    );
  }

  return (
    <Card
      style={{
        flex: 1,
        gap: Sizes.sm,
        padding: Sizes.md,
      }}
    >
      <BalanceInformation />
      <BalanceControls />
    </Card>
  );
}
