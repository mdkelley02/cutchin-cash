import React, { useMemo, useState } from "react";
import { View as DefaultView } from "react-native";
import {
  Text,
  View,
  TextInput,
  Sizes,
  useColor,
  BorderRadius,
} from "../components/Themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppState } from "../hooks/useAppState";
import { User } from "../models/User.model";

export type UserSearchProps = {
  modalTitle: string;
  selectedUserId?: string;
  onUserSelect: (user: User) => void;
};

export type UserSearchItemProps = {
  key: number;
  user: User;
};

export default function UserSearch({
  modalTitle,
  selectedUserId,
  onUserSelect,
}: UserSearchProps) {
  const { appDataState } = useAppState();
  const [search, setSearch] = useState("");
  const palette = useColor();

  const filteredUsers = useMemo(() => {
    return search.length === 0
      ? appDataState.users
      : appDataState.users.filter(({ fullName, displayName }) => {
          const searchLower = search.toLowerCase();
          return (
            fullName.toLowerCase().includes(searchLower) ||
            displayName.toLowerCase().includes(searchLower)
          );
        });
  }, [search, appDataState.users]);

  function UserSearchItem({ key, user }: UserSearchItemProps) {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => onUserSelect(user)}
        style={{
          backgroundColor:
            selectedUserId === user.userId ? palette.button : palette.card,
          borderRadius: BorderRadius.Card,
          padding: Sizes.sm,
        }}
      >
        <DefaultView
          style={{
            rowGap: Sizes.xxs,
          }}
        >
          <Text
            type="h5"
            style={{
              color:
                selectedUserId === user.userId
                  ? palette.buttonText
                  : palette.text,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            type="p"
            style={{
              color:
                selectedUserId === user.userId
                  ? palette.buttonText
                  : palette.subText,
            }}
          >
            @{user.displayName}
          </Text>
        </DefaultView>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        gap: Sizes.md,
      }}
    >
      <Text type="h3">{modalTitle}</Text>
      <TextInput
        placeholder="Search Users"
        value={search}
        onChangeText={(text) => setSearch(text)}
        iconPosition="right"
        icon={
          <FontAwesome5
            onPress={() => {
              setSearch("");
            }}
            name="times"
            size={Sizes.md}
            style={{
              display: search.length === 0 ? "none" : "flex",
            }}
            color={search.length === 0 ? "transparent" : palette.inputText}
          />
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, rowGap: Sizes.lg }}>
        {filteredUsers.map((user, key) => (
          <UserSearchItem key={key} user={user} />
        ))}
      </ScrollView>
    </View>
  );
}
