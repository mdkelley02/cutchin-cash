import React from "react";
import {
  BetterButton,
  Card,
  ScreenBase,
  Sizes,
  Text,
  View,
  iconProps,
  useColor,
} from "../components/Themed";
import { View as DefaultView } from "react-native";
import { Image } from "expo-image";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Routes } from "../constants/Routes";
import { useAppState } from "../hooks/useAppState";
import { useUser } from "../hooks/useUser";
import { useExecutePay } from "../hooks/useExecutePay";
import { PAY_BUTTON_CONFIG, REQUEST_BUTTON_CONFIG } from "../constants/Labels";

const MAX_LABEL_LENGTH = 15;
const PADDING = Sizes.md;

export const EVENT_BUTTONS = [PAY_BUTTON_CONFIG, REQUEST_BUTTON_CONFIG];

export default function Profile() {
  const { profileViewState, clearState } = useAppState();
  const { isUserMe, findUser } = useUser();
  const router = useRouter();
  const color = useColor();
  const navigation = useNavigation();

  const profileUserId = profileViewState.userId;
  if (profileUserId == null) {
    router.back();
    return null;
  }

  const profileUser = findUser(profileUserId);
  if (profileUser == null) {
    router.back();
    return null;
  }

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
    }: typeof EVENT_BUTTONS[number] & { key: number }) {
      function startPayFlow() {
        payEvent === "Request"
          ? startRequestPaymentFlow(profileUserId!)
          : startSendPaymentFlow(profileUserId!);
        router.push(Routes.KeyPad);
      }

      return (
        <BetterButton
          style={{
            flexBasis: "48%",
          }}
          icon={<FontAwesome5 {...iconProps(icon)} />}
          onPress={() => startPayFlow()}
          label={label}
        />
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
        {EVENT_BUTTONS.map((e, key) => (
          <ProfileButton key={key} {...e} />
        ))}
      </DefaultView>
    );
  }

  function Field({ title, value }: { title: string; value: string }) {
    return (
      <DefaultView style={{ gap: Sizes.xxs }}>
        <Text type="h4">{title}</Text>
        <Text>{value}</Text>
      </DefaultView>
    );
  }

  const personalFields = [
    { title: "UserId", value: profileUser.userId },
    { title: "Email", value: profileUser.email },
  ];

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

        {isUserMe(profileUserId) && (
          <>
            {personalFields.map(({ title, value }) => (
              <Field key={title} title={title} value={value!} />
            ))}
            <BetterButton
              label="Logout"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: Routes.Login,
                    } as any,
                  ],
                });
                clearState();
              }}
            />
          </>
        )}
      </Card>
    </View>
  );
}
