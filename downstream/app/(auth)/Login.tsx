import React, { useEffect, useState } from "react";
import {
  BetterButton,
  ScreenBase,
  Text,
  View,
  useColor,
} from "../../components/Themed";
import Form, { FormField } from "../../components/Form";
import { LOGIN_FIELDS } from "../../constants/Labels";
import { useAppState } from "../../hooks/useAppState";
import { AuthType, MetaType } from "../../store";
import * as FakeState from "../../store/FakeState";
import { Routes } from "../../constants/Routes";
import { Link, useNavigation, useRouter } from "expo-router";

export default function Login() {
  const FIELDS = LOGIN_FIELDS;
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const { dispatchAppData, dispatchAuth } = useAppState();
  const palette = useColor();

  function handleSubmit() {
    const { FAKE_AUTH, FAKE_APP_DATA } = FakeState.FakeState();
    dispatchAppData({
      type: MetaType.Restore,
      payload: FAKE_APP_DATA,
    });
    dispatchAuth({
      type: MetaType.Restore,
      payload: FAKE_AUTH,
    });
  }

  return (
    <View style={ScreenBase}>
      {error != null && <Text>{error}</Text>}
      <Form
        inputProps={FIELDS}
        handleChange={(text: string, index: number) => {
          const newFormFields = [...formFields];
          newFormFields[index] = {
            label: FIELDS[index].label,
            value: text,
          };
          setFormFields(newFormFields);
        }}
      />

      <BetterButton label="Login" onPress={handleSubmit} />
      <Link href={Routes.Register}>
        <Text style={{ textAlign: "center", color: palette.link }}>
          No Account? Register
        </Text>
      </Link>
    </View>
  );
}
