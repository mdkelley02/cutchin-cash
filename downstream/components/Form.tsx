import React, { useState } from "react";
import { TextInputProps } from "react-native/types";
import { InputField, InputFieldProps } from "./Themed";

export type FormField = {
  label: string;
  value: string;
};

export type FormProps = {
  inputProps: InputFieldProps[];
  handleChange: (text: string, index: number) => void;
};

export default function Form(props: FormProps) {
  return (
    <>
      {props.inputProps.map((inputProps, index) => (
        <InputField
          key={index}
          {...inputProps}
          onChangeText={(text) => props.handleChange(text, index)}
        />
      ))}
    </>
  );
}
