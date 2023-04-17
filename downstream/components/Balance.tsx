import { View } from "react-native";
import React from "react";
import { BetterButton, Card, Sizes, Text, iconProps, useColor } from "./Themed";
import { formatAmount } from "../models/Utils";
import { useRouter } from "expo-router";
import { Routes } from "../constants/Routes";
import { useAppState } from "../hooks/useAppState";
import { useExecutePay } from "../hooks/useExecutePay";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
        <View
          style={{
            rowGap: Sizes.xxs,
          }}
        >
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
          justifyContent: "space-between",
        }}
      >
        <BetterButton
          onPress={() => {
            router.push(Routes.KeyPad);
            startAddFundsFlow();
          }}
          icon={
            <MaterialIcons
              {...iconProps("attach-money", {
                size: Sizes.xl,
              })}
            />
          }
          label="Add Cash"
        />
        <BetterButton
          onPress={() => router.push(Routes.KeyPad)}
          icon={
            <MaterialCommunityIcons
              {...iconProps("bank", {
                size: Sizes.lg,
              })}
            />
          }
          label="Cash Out"
        />
      </View>
    );
  }

  return (
    <Card
      style={{
        flex: 1,
        gap: Sizes.lg,
        padding: Sizes.md,
      }}
    >
      <BalanceInformation />
      <BalanceControls />
    </Card>
  );
}
