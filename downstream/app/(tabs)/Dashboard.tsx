import React, { useEffect } from "react";
import { ScreenBase, Sizes, Text, View } from "../../components/Themed";
import { ScrollView } from "react-native";
import Balance from "../../components/Balance";
import Transactions from "../../components/Transactions";
import { useNavigation } from "expo-router";

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View style={ScreenBase}>
      <View
        style={{
          height: 160,
        }}
      >
        <Balance />
      </View>
      <View style={{ gap: Sizes.sm }}>
        <Text type="h3">Transactions</Text>
        <ScrollView>
          <Transactions />
        </ScrollView>
      </View>
    </View>
  );
}
