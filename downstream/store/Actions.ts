export enum MetaActionType {
  Purge = "PURGE",
  Restore = "RESTORE",
}

export enum AuthActionType {
  SetAll = "SET_ALL",
}

export enum AppDataActionType {
  SetTransactions = "SET_TRANSACTIONS",
  DecisionTransaction = "DECISION_TRANSACTION",
  SetUsers = "SET_USERS",
}

export enum PayViewActionType {
  SetFractionAmount = "SET_FRACTION_AMOUNT",
  SetWholeAmount = "SET_WHOLE_AMOUNT",
}

export enum ProfileViewActionType {
  SetProfileUserId = "SET_PROFILE_USER",
}

export enum ExecutePayActionType {
  SetPayEvent = "SET_PAY_EVENT",
  SetPayingUserId = "SET_PAYING_USER_ID",
  SetReceivingUserId = "SET_RECEIVING_USER_ID",
}

export interface Action<T> {
  type: T | MetaActionType;
  payload?: any;
}
