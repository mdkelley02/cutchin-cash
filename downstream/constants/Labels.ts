import { InputFieldProps } from "../components/Themed";
import { PayEvent } from "../store";

export const PayEventToLabel: Record<PayEvent, string> = {
  Pay: "Pay",
  Request: "Request",
  AddFunds: "Add Funds",
};

export type PayEventButtonConfig = {
  payEvent: PayEvent;
  icon: string;
  label: string;
};

export const PAY_BUTTON_CONFIG: PayEventButtonConfig = {
  payEvent: "Pay" as PayEvent,
  icon: "money-bill-wave",
  label: "Pay",
};
export const REQUEST_BUTTON_CONFIG: PayEventButtonConfig = {
  payEvent: "Request" as PayEvent,
  icon: "money-check-alt",
  label: "Request",
};
export const ADD_FUNDS_BUTTON_CONFIG: PayEventButtonConfig = {
  payEvent: "AddFunds" as PayEvent,
  icon: "plus-circle",
  label: "Add Cash",
};
export const UNSELECTED_BUTTON_CONFIG: PayEventButtonConfig = {
  payEvent: "Pay" as PayEvent,
  icon: "money-bill-wave",
  label: "Pay",
};

export const PayEventToButtonConfig: Record<PayEvent, PayEventButtonConfig> = {
  Pay: PAY_BUTTON_CONFIG,
  Request: REQUEST_BUTTON_CONFIG,
  AddFunds: ADD_FUNDS_BUTTON_CONFIG,
};

export const LOGIN_FIELDS: InputFieldProps[] = [
  {
    label: "Email",
    placeholder: "Email",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    label: "Password",
    placeholder: "Password",
    keyboardType: "email-address",
    autoCapitalize: "none",
    secureTextEntry: true,
  },
];

export const REGISTER_FIELDS: InputFieldProps[] = [
  ...LOGIN_FIELDS,
  {
    label: "Full Name",
    placeholder: "Full Name",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    label: "Display Name",
    placeholder: "Display Name",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
];
