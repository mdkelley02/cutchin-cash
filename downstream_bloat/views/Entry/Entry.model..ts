export type FormField = {
  label: string;
  type: "text" | "email" | "password";
};

export const LoginFields = {
  Email: {
    label: "Email",
    type: "email",
  },
  Password: {
    label: "Password",
    type: "password",
  },
} as const;

export const RegisterFields = {
  DisplayName: {
    label: "Display Name",
    type: "text",
  },
  Name: {
    label: "Name",
    type: "text",
  },
  Email: {
    label: "Email",
    type: "email",
  },
  Password: {
    label: "Password",
    type: "password",
  },
} as const;
