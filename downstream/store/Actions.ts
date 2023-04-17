export enum MetaType {
  Purge = "PURGE",
  Restore = "RESTORE",
}

export enum AuthType {
  SetToken = "SET_TOKEN",
  SetUser = "SET_USER",
  Logout = "LOG_OUT",
  SetAll = "SET_ALL",
}

export enum AppDataType {
  SetTransactions = "SET_TRANSACTIONS",
  DecisionTransaction = "DECISION_TRANSACTION",
  SetUsers = "SET_USERS",
}

export enum PayViewType {
  SetFractionAmount = "SET_FRACTION_AMOUNT",
  SetWholeAmount = "SET_WHOLE_AMOUNT",
}

export enum ProfileViewType {
  SetProfileUserId = "SET_PROFILE_USER",
}

export enum ExecutePayType {
  SetPayEvent = "SET_PAY_EVENT",
  SetPayingUserId = "SET_PAYING_USER_ID",
  SetReceivingUserId = "SET_RECEIVING_USER_ID",
  SetAll = "SET_ALL",
}

export type Action<T> = {
  type: T | MetaType;
  payload?: any;
};
