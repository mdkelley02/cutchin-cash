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
  onUserSelect: (user: User) => void;
};

export default function UserSearch({
  modalTitle,
  onUserSelect,
}: UserSearchProps) {
  const { appDataState } = useAppState();
  const [search, setSearch] = useState("");
  const color = useColor();

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

  function UserSearchInput() {
    const [tempSearch, setTempSearch] = useState(search);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color.input,
          borderRadius: BorderRadius.Input,
          padding: Sizes.sm,
          height: 56,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: Sizes.md,
            padding: 0,
            color: color.text,
          }}
          placeholderTextColor={color.inputText}
          placeholder="Search Users"
          value={tempSearch}
          onChangeText={(text) => setTempSearch(text)}
          onSubmitEditing={() => setSearch(tempSearch)}
        />
        <TouchableOpacity
          onPress={() => {
            setSearch("");
            setTempSearch("");
          }}
        >
          <FontAwesome5
            name="times"
            size={Sizes.md}
            style={{
              display: tempSearch.length === 0 ? "none" : "flex",
            }}
            color={tempSearch.length === 0 ? "transparent" : color.inputText}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function UserSearchItem({ key, user }: { key: number; user: User }) {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => onUserSelect(user)}
        style={{
          backgroundColor: color.card,
          borderRadius: BorderRadius.Card,
          padding: Sizes.sm,
        }}
      >
        <DefaultView
          style={{
            rowGap: Sizes.xxs,
          }}
        >
          {[user.fullName, user.displayName].map((name, key) => (
            <Text
              bold={name === user.displayName}
              type={key === 0 ? "h5" : "p"}
              key={key}
              style={{
                color: name === user.displayName ? color.subText : color.text,
              }}
            >
              {name === user.displayName ? "@" : ""}
              {name}
            </Text>
          ))}
        </DefaultView>
      </TouchableOpacity>
    );
  }

  function UserScrollContainer() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, rowGap: Sizes.lg }}>
        {filteredUsers.map((user, key) => (
          <UserSearchItem key={key} user={user} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        gap: Sizes.md,
      }}
    >
      <Text type="h3">{modalTitle}</Text>
      <UserSearchInput />
      <UserScrollContainer />
    </View>
  );
}
