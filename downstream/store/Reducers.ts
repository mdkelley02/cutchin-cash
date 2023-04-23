import {
  AppDataState,
  AuthState,
  ExecutePayState,
  INITIAL_APP_DATA_STATE,
  INITIAL_AUTH_STATE,
  INITIAL_EXECUTE_PAY_STATE,
  INITIAL_PAY_VIEW_STATE,
  INITIAL_PROFILE_VIEW_STATE,
  PayViewState,
  ProfileViewState,
} from "./State";
import {
  AuthActionType,
  AppDataActionType,
  PayViewActionType,
  ProfileViewActionType,
  ExecutePayActionType,
  MetaActionType,
  Action,
} from "./Actions";

function isMetaAction(action: Action<any>): action is Action<MetaActionType> {
  return (
    action.type === MetaActionType.Purge ||
    action.type === MetaActionType.Restore
  );
}

function MetaReducer<T>(
  state: T,
  action: Action<MetaActionType>,
  initial: T
): T {
  switch (action.type) {
    case MetaActionType.Purge:
      return initial;
    case MetaActionType.Restore:
      return action.payload;
    default:
      return state;
  }
}

export function AuthReducer(
  state: AuthState,
  action: Action<AuthActionType>
): AuthState {
  if (isMetaAction(action))
    return MetaReducer(state, action, INITIAL_AUTH_STATE);

  switch (action.type) {
    case AuthActionType.SetAll:
      return {
        ...state,
        token: action.payload.token ?? state.token,
        user: action.payload.user ?? state.user,
      };
    default:
      return state;
  }
}

export function AppDataReducer(
  state: AppDataState,
  action: Action<AppDataActionType>
): AppDataState {
  if (isMetaAction(action))
    return MetaReducer(state, action, INITIAL_APP_DATA_STATE);

  switch (action.type) {
    case AppDataActionType.SetTransactions:
      return { ...state, transactions: action.payload };
    case AppDataActionType.DecisionTransaction:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction.transactionId === action.payload.id)
            return action.payload;
          return transaction;
        }),
      };
    case AppDataActionType.SetUsers:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export function PayViewReducer(
  state: PayViewState,
  action: Action<PayViewActionType>
): PayViewState {
  if (isMetaAction(action))
    return MetaReducer(state, action, INITIAL_PAY_VIEW_STATE);

  switch (action.type) {
    case PayViewActionType.SetFractionAmount:
      return {
        ...state,
        payAmount: { ...state.payAmount, fraction: action.payload },
      };
    case PayViewActionType.SetWholeAmount:
      return {
        ...state,
        payAmount: { ...state.payAmount, whole: action.payload },
      };
    default:
      return state;
  }
}

export function ProfileViewReducer(
  state: ProfileViewState,
  action: Action<ProfileViewActionType>
): ProfileViewState {
  if (isMetaAction(action))
    return MetaReducer(state, action, INITIAL_PROFILE_VIEW_STATE);
  switch (action.type) {
    case ProfileViewActionType.SetProfileUserId:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export function ExecutePayRecuer(
  state: ExecutePayState,
  action: Action<ExecutePayActionType>
): ExecutePayState {
  if (isMetaAction(action))
    return MetaReducer(state, action, INITIAL_EXECUTE_PAY_STATE);
  switch (action.type) {
    case ExecutePayActionType.SetPayEvent:
      return { ...state, payEvent: action.payload };
    case ExecutePayActionType.SetPayingUserId:
      return { ...state, payingUserId: action.payload };
    case ExecutePayActionType.SetReceivingUserId:
      return { ...state, receivingUserId: action.payload };
    default:
      return state;
  }
}
