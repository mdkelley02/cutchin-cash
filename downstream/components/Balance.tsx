import { View } from "react-native";
import React from "react";
import { Button, Card, Sizes, Text } from "./Themed";
import { formatAmount } from "../models/Utils";
import { useRouter } from "expo-router";
import { Events, Routes } from "../constants/Routes";
import { ExecutePayType } from "../store";
import { useAppState } from "../hooks/useAppState";

export default function Balance() {
  const router = useRouter();
  const { authState, dispatchExecutePay } = useAppState();

  return (
    <Card
      style={{
        flex: 1,
        gap: Sizes.sm,
        padding: Sizes.md,
      }}
    >
      {/* Top */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Balance */}
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

      {/* Bottom */}
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
            dispatchExecutePay({
              type: ExecutePayType.SetPayEvent,
              payload: Events.AddFunds,
            });
          }}
        >
          <Text type="h6">Add Cash</Text>
        </Button>
        <Button onPress={() => router.push(Routes.Pay)}>
          <Text type="h6">Cash Out</Text>
        </Button>
      </View>
    </Card>
  );
}
