import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { styles } from "./Entry.style";
import { LoginFields, RegisterFields } from "./Entry.model.";
import { Theme } from "../../models/theme";
import { useUpstream } from "../../contexts/GrpcContext";
import { LoginRequest, RegisterRequest } from "../../models/proto/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Tab = keyof typeof Tabs;

const Tabs = {
  Login: {
    title: "Login",
    fields: LoginFields,
  },
  Register: {
    title: "Register",
    fields: RegisterFields,
  },
} as const;

export default function Entry({ navigation }: NativeStackScreenProps<any>) {
  const { login, register } = useUpstream();
  const [activeTab, setActiveTab] = useState<Tab>(Tabs.Login.title);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function getMissingFields(): string[] {
    return Object.keys(Tabs[activeTab].fields).reduce((acc, key) => {
      return !fields[key] ? [...acc, key] : acc;
    }, [] as string[]);
  }

  async function onSubmit() {
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      setFormError(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }
    const base = {
      email: fields.Email,
      password: fields.Password,
    };

    try {
      if (activeTab === Tabs.Login.title) {
        await login(LoginRequest.create(base));
      } else {
        register(
          RegisterRequest.create({
            ...base,
            fullName: fields.Name,
            displayName: fields.DisplayName,
          })
        );
      }

      navigation.navigate("Dashboard");
    } catch (e) {
      setFormError(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.form}>
        {/* Tabs */}
        <View
          style={{
            ...styles.tabs,
            borderBottomColor: Theme.colors.buttonSecondary,
            paddingBottom: Theme.spacing.md,
            borderBottomWidth: 2,
          }}
        >
          {Object.values(Tabs).map(({ title }) => (
            <Button
              onPress={() => {
                setActiveTab(title);
                setFields({});
              }}
              color={
                activeTab === title
                  ? Theme.colors.button
                  : Theme.colors.buttonSecondary
              }
              style={{
                flex: 1,
                borderRadius: 0,
              }}
            >
              <Text>{title}</Text>
            </Button>
          ))}
        </View>

        {/* Fields */}
        <View style={styles.formFieldContainer}>
          {Object.entries(Tabs[activeTab].fields).map(
            ([key, { label, type }]) => (
              <View key={key} style={styles.formField}>
                <Text>{label}</Text>
                <TextInput
                  onChange={(event) => {
                    setFields({
                      ...fields,
                      [key]: event.nativeEvent.text,
                    });
                  }}
                  secureTextEntry={type === "password"}
                  style={styles.input}
                />
              </View>
            )
          )}
        </View>

        {/* Submit */}
        <View
          style={{
            borderTopColor: Theme.colors.buttonSecondary,
            paddingTop: Theme.spacing.md,
            borderTopWidth: 2,
          }}
        >
          <Button onPress={onSubmit} disabled={getMissingFields.length !== 0}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
}
