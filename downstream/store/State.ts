import { Transaction } from "../models/Transaction.model";
import { User } from "../models/User.model";

export const AuthStateStorageKey = "AUTH_STATE";
export interface AuthState {
  token: string | null;
  user: User | null;
}
export const INITIAL_AUTH_STATE: AuthState = {
  token: null,
  user: null,
};

export const AppDataStateStorageKey = "APP_DATA_STATE";
export interface AppDataState {
  transactions: Transaction[];
  users: User[];
}
export const INITIAL_APP_DATA_STATE: AppDataState = {
  transactions: [],
  users: [],
};

export const PayViewStateStorageKey = "PAY_VIEW_STATE";
export interface PayViewState {
  payAmount: {
    whole: number;
    fraction: number | null;
  };
}
export const INITIAL_PAY_VIEW_STATE: PayViewState = {
  payAmount: { whole: 0, fraction: null },
};

export const ProfileViewStateStorageKey = "PROFILE_VIEW_STATE";
export interface ProfileViewState {
  userId: string | null;
}
export const INITIAL_PROFILE_VIEW_STATE: ProfileViewState = {
  userId: null,
};

export const ExecutePayStateStorageKey = "EXECUTE_PAY_STATE";

export const PayEvents = ["Pay", "Request", "AddFunds"] as const;
export const SelectablePayEvents = ["Pay", "Request"] as const;
export type PayEvent = typeof PayEvents[number];
export interface ExecutePayState {
  payEvent: PayEvent | null;
  payingUserId: string | null;
  receivingUserId: string | null;
}
export const INITIAL_EXECUTE_PAY_STATE: ExecutePayState = {
  payEvent: null,
  payingUserId: null,
  receivingUserId: null,
};
