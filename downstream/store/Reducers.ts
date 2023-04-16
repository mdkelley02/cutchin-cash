import {
  AppDataState,
  AuthState,
  ExecutePayState,
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
} from "./Actions";

export function AuthReducer(
  state: AuthState,
  action: Action<AuthType>
): AuthState {
  switch (action.type) {
    case AuthType.SetToken:
      return { ...state, token: action.payload };
    case AuthType.SetUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function AppDataReducer(
  state: AppDataState,
  action: Action<AppDataType>
): AppDataState {
  switch (action.type) {
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
    case ProfileViewType.SetProfileUserId:
      console.log("ProfileViewReducer", action);
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
    case ExecutePayType.SetPayEvent:
      return { ...state, payEvent: action.payload };
    case ExecutePayType.SetPayingUserId:
      return { ...state, payingUserId: action.payload };
    case ExecutePayType.SetReceivingUserId:
      console.log("ExecutePayRecuer", action);
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
