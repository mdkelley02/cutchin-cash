export type Action<T> = {
  type: T;
  payload: any;
};

export enum AuthType {
  Restore = "RESTORE",
  SetToken = "SET_TOKEN",
  SetUser = "SET_USER",
}

export enum AppDataType {
  Restore = "RESTORE",
  SetTransactions = "SET_TRANSACTIONS",
  DecisionTransaction = "DECISION_TRANSACTION",
  SetUsers = "SET_USERS",
}

export enum PayViewType {
  Restore = "RESTORE",
  SetFractionAmount = "SET_FRACTION_AMOUNT",
  SetWholeAmount = "SET_WHOLE_AMOUNT",
}

export enum ProfileViewType {
  Restore = "RESTORE",
  SetProfileUserId = "SET_PROFILE_USER",
}

export enum ExecutePayType {
  Restore = "RESTORE",
  SetPayEvent = "SET_PAY_EVENT",
  SetPayingUserId = "SET_PAYING_USER_ID",
  SetReceivingUserId = "SET_RECEIVING_USER_ID",
  SetAll = "SET_ALL",
}
