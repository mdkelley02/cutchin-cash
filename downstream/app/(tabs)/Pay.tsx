import React from "react";
import { Text, View } from "../../components/Themed";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function Pay() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    numberContainer: {
      flexDirection: "row",
    },
    number: {
      backgroundColor: Colors[colorScheme ?? "light"].card,
      padding: 26,
      flex: 3,
    },
  });

  const [amount, setAmount] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        {numbers.map((number) => (
          <Text
            style={styles.number}
            key={number}
            onPress={() => setAmount(amount * 10 + number)}
          >
            {number}
          </Text>
        ))}
      </View>
    </View>
  );
}
