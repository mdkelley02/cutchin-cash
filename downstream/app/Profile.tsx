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
import { ExecutePayType } from "../store";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Routes } from "../constants/Routes";
import { useAppState } from "../hooks/useAppState";
import { useUser } from "../hooks/useUser";

const MAX_LABEL_LENGTH = 20;
const PADDING = Sizes.md;

export default function Profile() {
  const { profileViewState, authState, dispatchExecutePay } = useAppState();
  const { isUserMe, findUser } = useUser();
  const router = useRouter();
  const color = useColor();
  const profileUserId = profileViewState.userId;
  const profileUser = findUser(profileUserId);

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
    function handleRequestPay() {
      dispatchExecutePay({
        type: ExecutePayType.SetAll,
        payload: {
          payingUserId: authState.user?.userId,
          receivingUserId: profileViewState.userId,
        },
      });
      router.push(Routes.Pay);
    }

    return (
      <DefaultView>
        <DefaultView style={{ gap: Sizes.sm }}>
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: PADDING,
              columnGap: PADDING,
            }}
            onPress={handleRequestPay}
          >
            <FontAwesome5
              name="money-check-alt"
              size={Sizes.lg}
              color={color.text}
            />
            <Text type="h6" style={{ color: color.text }}>
              Request Payment
            </Text>
          </Button>
        </DefaultView>
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
