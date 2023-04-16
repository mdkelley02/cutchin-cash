import React from "react";
import {
  Button,
  Card,
  ScreenBase,
  Sizes,
  Text,
  View,
  useColor,
} from "../components/Themed";
import { View as DefaultView } from "react-native";
import { Image } from "expo-image";
import { ExecutePayType, PayEvent } from "../store";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Routes } from "../constants/Routes";
import { useAppState } from "../hooks/useAppState";
import { useUser } from "../hooks/useUser";
import { useExecutePay } from "../hooks/useExecutePay";

const MAX_LABEL_LENGTH = 15;
const PADDING = Sizes.md;
const PROFILE_CONTROL_EVENTS = [
  {
    payEvent: "Request" as PayEvent,
    icon: "money-check-alt" as ExecutePayType,
    label: "Request",
  },
  {
    payEvent: "Pay" as PayEvent,
    icon: "money-bill-wave" as ExecutePayType,
    label: "Pay",
  },
];

export default function Profile() {
  const { profileViewState } = useAppState();
  const { isUserMe, findUser } = useUser();
  const navigaton = useNavigation();

  const profileUserId = profileViewState.userId;
  if (profileUserId == null) {
    navigaton.goBack();
    return null;
  }

  const profileUser = findUser(profileUserId);
  if (profileUser == null) {
    navigaton.goBack();
    return null;
  }

  const router = useRouter();
  const color = useColor();
  const { startRequestPaymentFlow, startSendPaymentFlow } = useExecutePay();

  function ProfileCardInformation() {
    const profilePicture = useProfilePicture();

    return (
      <DefaultView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DefaultView>
          <Image
            source={profilePicture ?? ""}
            style={{
              backgroundColor: color.button,
              alignSelf: "flex-start",
              borderRadius: 90,
              width: 90,
              height: 90,
            }}
          />
        </DefaultView>

        <DefaultView style={{ alignSelf: "center" }}>
          <Text type="h1">
            {profileUser?.fullName.substring(0, MAX_LABEL_LENGTH)}
          </Text>
          <Text
            type="p"
            style={{
              color: color.subText,
            }}
          >
            @{profileUser?.displayName.substring(0, MAX_LABEL_LENGTH)}
          </Text>
        </DefaultView>
      </DefaultView>
    );
  }

  function ProfileCardControls() {
    function ProfileButton({
      key,
      payEvent,
      label,
      icon,
    }: typeof PROFILE_CONTROL_EVENTS[number] & { key: number }) {
      function startPayFlow() {
        payEvent === "Request"
          ? startRequestPaymentFlow(profileUserId!)
          : startSendPaymentFlow(profileUserId!);
        router.push(Routes.Pay);
      }

      return (
        <Button
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexBasis: "48%",
            padding: PADDING,
            columnGap: PADDING,
          }}
          onPress={() => startPayFlow()}
        >
          <FontAwesome5 name={icon} size={Sizes.lg} color={color.text} />
          <Text type="h6" style={{ color: color.text }}>
            {label}
          </Text>
        </Button>
      );
    }

    return (
      <DefaultView
        style={{
          gap: Sizes.sm,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {PROFILE_CONTROL_EVENTS.map((e, key) => (
          <ProfileButton key={key} {...e} />
        ))}
      </DefaultView>
    );
  }

  return (
    <View style={ScreenBase}>
      <Card
        style={{
          gap: PADDING,
          padding: PADDING,
        }}
      >
        <ProfileCardInformation />
        {!isUserMe(profileUserId) && <ProfileCardControls />}
      </Card>
    </View>
  );
}
