import React, { useMemo, useState } from "react";
import { View as DefaultView } from "react-native";
import {
  Text,
  View,
  TextInput,
  Sizes,
  TouchableCard,
  ModalBase,
  useColor,
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
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color.input,
          borderRadius: Sizes.sm,
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
          value={search}
          placeholder="Search for a user"
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setSearch("")}>
          <FontAwesome5
            name="times"
            size={Sizes.md}
            style={{
              display: search.length === 0 ? "none" : "flex",
            }}
            color={search.length === 0 ? "transparent" : color.inputText}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function UserSearchItem({ key, user }: { key: number; user: User }) {
    return (
      <TouchableCard key={key} onPress={() => onUserSelect(user)}>
        <DefaultView
          style={{
            backgroundColor: color.buttonSecondary,
          }}
        >
          {[user.fullName, user.displayName].map((name, key) => (
            <Text type={key === 0 ? "h5" : "p"} key={key}>
              {name}
            </Text>
          ))}
        </DefaultView>
      </TouchableCard>
    );
  }

  function UserScrollContainer() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, rowGap: Sizes.md }}>
        {filteredUsers.map((user, key) => (
          <UserSearchItem key={key} user={user} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={ModalBase}>
      <Text type="h3">{modalTitle}</Text>
      <UserSearchInput />
      <UserScrollContainer />
    </View>
  );
}
