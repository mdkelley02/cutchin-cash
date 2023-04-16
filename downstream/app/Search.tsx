import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Sizes,
  DefaultScheme,
  TouchableCard,
  ModalBase,
} from "../components/Themed";
import { ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProfileViewType } from "../store";
import { Routes } from "../constants/Routes";
import { useNavigation, useRouter } from "expo-router";
import { useAppState } from "../hooks/useAppState";

export default function Search() {
  const { appDataState, dispatchProfileView } = useAppState();
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();
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
  const navigation = useNavigation();

  return (
    <View style={ModalBase}>
      <Text type="h3">Choose User</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: Colors[colorScheme ?? DefaultScheme].input,
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
            color: Colors[colorScheme ?? DefaultScheme].text,
          }}
          placeholderTextColor={Colors[colorScheme ?? DefaultScheme].inputText}
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
            color={
              search.length === 0
                ? "transparent"
                : Colors[colorScheme ?? DefaultScheme].inputText
            }
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, rowGap: Sizes.md }}>
        {filteredUsers.map(({ fullName, displayName, userId }, key) => (
          <TouchableCard
            key={key}
            onPress={() => {
              navigation.goBack();
              router.push(Routes.Profile);
              dispatchProfileView({
                type: ProfileViewType.SetProfileUserId,
                payload: userId,
              });
            }}
          >
            <View
              style={{
                backgroundColor:
                  Colors[colorScheme ?? DefaultScheme].buttonSecondary,
              }}
            >
              {[fullName, displayName].map((name, key) => (
                <Text type={key === 0 ? "h5" : "p"} key={key}>
                  {name}
                </Text>
              ))}
            </View>
          </TouchableCard>
        ))}
      </ScrollView>
    </View>
  );
}
