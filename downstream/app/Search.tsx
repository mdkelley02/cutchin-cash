import React from "react";
import { ProfileViewActionType } from "../store";
import { Routes } from "../constants/Routes";
import { useNavigation, useRouter } from "expo-router";
import { useAppState } from "../hooks/useAppState";
import UserSearch from "../components/UserSearch";
import { User } from "../models/User.model";
import { ModalBase, View } from "../components/Themed";

export default function Search() {
  const router = useRouter();
  const { dispatchProfileView } = useAppState();

  function onUserSelect(user: User) {
    router.replace(Routes.Profile);

    dispatchProfileView({
      type: ProfileViewActionType.SetProfileUserId,
      payload: user.userId,
    });
  }

  return (
    <View style={ModalBase}>
      <UserSearch modalTitle="Choose User" onUserSelect={onUserSelect} />
    </View>
  );
}
