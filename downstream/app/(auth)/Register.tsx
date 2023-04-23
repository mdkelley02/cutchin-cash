import React, { useState } from "react";
import {
  BetterButton,
  ErrorCard,
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
import { MetaActionType } from "../../store";

export default function Register() {
  const FIELDS = REGISTER_FIELDS;
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const palette = useColor();
  const { dispatchAppData, dispatchAuth } = useAppState();

  function handleSubmit() {
    if (formFields.length < 2) {
      setError("Please fill out all fields");
      return;
    }
    const { FAKE_AUTH, FAKE_APP_DATA } = FakeState();
    dispatchAppData({
      type: MetaActionType.Restore,
      payload: FAKE_APP_DATA,
    });
    dispatchAuth({
      type: MetaActionType.Restore,
      payload: FAKE_AUTH,
    });
  }

  return (
    <View style={ScreenBase}>
      <View
        style={{
          height: "8%",
          justifyContent: "center",
        }}
      >
        {error != null && <ErrorCard message={error} />}
      </View>
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
