import React from "react";
import { ScreenBase, Sizes, Text, View } from "../../components/Themed";
import { ScrollView } from "react-native";
import Balance from "../../components/Balance";
import Transactions from "../../components/Transactions";

export default function Dashboard() {
  return (
    <View style={ScreenBase}>
      <View
        style={{
          height: 170,
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
