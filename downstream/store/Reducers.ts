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
  AuthType,
  Action,
  AppDataType,
  PayViewType,
  ProfileViewType,
  ExecutePayType,
  MetaType,
} from "./Actions";

export function AuthReducer(
  state: AuthState,
  action: Action<AuthType>
): AuthState {
  switch (action.type) {
    case MetaType.Purge:
      return INITIAL_AUTH_STATE;
    case MetaType.Restore:
      return action.payload;
    case AuthType.SetToken:
      return { ...state, token: action.payload };
    case AuthType.SetUser:
      return { ...state, user: action.payload };
    case AuthType.Logout:
      return { ...state, token: null, user: null };
    case AuthType.SetAll:
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
  action: Action<AppDataType>
): AppDataState {
  switch (action.type) {
    case MetaType.Purge:
      return INITIAL_APP_DATA_STATE;
    case MetaType.Restore:
      return action.payload;
    case AppDataType.SetTransactions:
      return { ...state, transactions: action.payload };
    case AppDataType.DecisionTransaction:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction.transactionId === action.payload.id)
            return action.payload;
          return transaction;
        }),
      };
    case AppDataType.SetUsers:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export function PayViewReducer(
  state: PayViewState,
  action: Action<PayViewType>
): PayViewState {
  switch (action.type) {
    case MetaType.Purge:
      return INITIAL_PAY_VIEW_STATE;
    case MetaType.Restore:
      return action.payload;
    case PayViewType.SetFractionAmount:
      return {
        ...state,
        payAmount: { ...state.payAmount, fraction: action.payload },
      };
    case PayViewType.SetWholeAmount:
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
  action: Action<ProfileViewType>
): ProfileViewState {
  switch (action.type) {
    case MetaType.Purge:
      return INITIAL_PROFILE_VIEW_STATE;
    case MetaType.Restore:
      return action.payload;
    case ProfileViewType.SetProfileUserId:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export function ExecutePayRecuer(
  state: ExecutePayState,
  action: Action<ExecutePayType>
): ExecutePayState {
  switch (action.type) {
    case MetaType.Purge:
      return INITIAL_EXECUTE_PAY_STATE;
    case MetaType.Restore:
      return action.payload;
    case ExecutePayType.SetPayEvent:
      return { ...state, payEvent: action.payload };
    case ExecutePayType.SetPayingUserId:
      return { ...state, payingUserId: action.payload };
    case ExecutePayType.SetReceivingUserId:
      return { ...state, receivingUserId: action.payload };
    case ExecutePayType.SetAll:
      return {
        ...state,
        payEvent: action.payload.payEvent ?? state.payEvent,
        payingUserId: action.payload.payingUserId ?? state.payingUserId,
        receivingUserId:
          action.payload.receivingUserId ?? state.receivingUserId,
      };
    default:
      return state;
  }
}
