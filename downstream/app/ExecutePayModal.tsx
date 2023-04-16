import { Button, Text, View, useColor } from "../components/Themed";
import { ModalBase, Sizes } from "../components/Themed";
import { useNavigation } from "expo-router";
import { formatAmount } from "../models/Utils";
import { View as DefaultView } from "react-native";
import { useAppState } from "../hooks/useAppState";
import { PayEventToLabel } from "../constants/Labels";
import { useUser } from "../hooks/useUser";

function Field(key: number, title: string, value: string) {
  return (
    <DefaultView style={{ rowGap: Sizes.xxs }} key={key}>
      <Text type="h4">{title}</Text>
      <Text>{value}</Text>
    </DefaultView>
  );
}

export default function ExecutePayModal() {
  const navigation = useNavigation();
  const { payViewState, executePayState } = useAppState();
  if (Object.values(executePayState).some((s) => s == null)) {
    navigation.goBack();
  }

  const { findUser } = useUser();
  const colors = useColor();
  const payingUser = findUser(executePayState.payingUserId);
  const receivingUser = findUser(executePayState.receivingUserId);

  function TransactionInformation() {
    const FIELDS = [
      {
        title: `Confirm ${PayEventToLabel[executePayState.payEvent!]}`,
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
          {FIELDS.map((f, key) => Field(key, f.title, f.value))}
        </DefaultView>
      </DefaultView>
    );
  }

  function TransactionControls() {
    return (
      <DefaultView
        style={{
          flexDirection: "row",
          gap: Sizes.sm,
          justifyContent: "center",
        }}
      >
        <Button
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          style={{
            backgroundColor: colors.buttonSecondary,
          }}
        >
          <Text>Confirm</Text>
        </Button>
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
