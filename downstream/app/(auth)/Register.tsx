import React, { useState } from "react";
import {
  BetterButton,
  ScreenBase,
  Text,
  View,
  useColor,
} from "../../components/Themed";
import Form, { FormField } from "../../components/Form";
import { REGISTER_FIELDS } from "../../constants/Labels";
import { Routes } from "../../constants/Routes";
import { Link } from "expo-router";
import { FakeState } from "../../store/FakeState";
import { useAppState } from "../../hooks/useAppState";
import { MetaType } from "../../store";

export default function Register() {
  const FIELDS = REGISTER_FIELDS;
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const palette = useColor();
  const { dispatchAppData, dispatchAuth } = useAppState();
  function handleSubmit() {
    const { FAKE_AUTH, FAKE_APP_DATA } = FakeState();
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
      <BetterButton label="Register" onPress={handleSubmit} />
      <Link href={Routes.Login}>
        <Text style={{ textAlign: "center", color: palette.link }}>
          Got an Account? Login
        </Text>
      </Link>
    </View>
  );
}
