import React, { createContext, useReducer, useEffect } from "react";
import {
  AppDataState,
  AuthState,
  PayViewState,
  ProfileViewState,
  ExecutePayState,
  INITIAL_APP_DATA_STATE,
  INITIAL_AUTH_STATE,
  INITIAL_PAY_VIEW_STATE,
  INITIAL_PROFILE_VIEW_STATE,
  INITIAL_EXECUTE_PAY_STATE,
} from "./State";
import { FakeState } from "./FakeState";
import {
  AppDataReducer,
  AuthReducer,
  ExecutePayRecuer,
  PayViewReducer,
  ProfileViewReducer,
} from "./Reducers";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import { Routes, Segments } from "../constants/Routes";
import { MetaActionType } from "./Actions";

interface AppStateContextProps {
  authState: AuthState;
  dispatchAuth: React.Dispatch<any>;
  payViewState: PayViewState;
  dispatchPayView: React.Dispatch<any>;
  appDataState: AppDataState;
  dispatchAppData: React.Dispatch<any>;
  profileViewState: ProfileViewState;
  dispatchProfileView: React.Dispatch<any>;
  executePayState: ExecutePayState;
  dispatchExecutePay: React.Dispatch<any>;
  clearState: () => void;
}

export const AppContext = createContext<AppStateContextProps>({
  authState: INITIAL_AUTH_STATE,
  dispatchAuth: () => null,
  payViewState: INITIAL_PAY_VIEW_STATE,
  dispatchPayView: () => null,
  appDataState: INITIAL_APP_DATA_STATE,
  dispatchAppData: () => null,
  profileViewState: INITIAL_PROFILE_VIEW_STATE,
  dispatchProfileView: () => null,
  executePayState: INITIAL_EXECUTE_PAY_STATE,
  dispatchExecutePay: () => null,
  clearState: () => null,
});

const { FAKE_AUTH, FAKE_APP_DATA } = FakeState();

export function AppProvider({ children }: any) {
  const router = useRouter();
  const segments = useSegments();
  const [authState, dispatchAuth] = useReducer(AuthReducer, FAKE_AUTH);
  const [payViewState, dispatchPayView] = useReducer(
    PayViewReducer,
    INITIAL_PAY_VIEW_STATE
  );
  const [appDataState, dispatchAppData] = useReducer(
    AppDataReducer,
    FAKE_APP_DATA
  );
  const [profileViewState, dispatchProfileView] = useReducer(
    ProfileViewReducer,
    INITIAL_PROFILE_VIEW_STATE
  );
  const [executePayState, dispatchExecutePay] = useReducer(
    ExecutePayRecuer,
    INITIAL_EXECUTE_PAY_STATE
  );

  function clearState() {
    dispatchAuth({ type: MetaActionType.Purge });
    dispatchPayView({ type: MetaActionType.Purge });
    dispatchAppData({ type: MetaActionType.Purge });
    dispatchProfileView({ type: MetaActionType.Purge });
    dispatchExecutePay({ type: MetaActionType.Purge });
  }

  const user = authState?.user;
  useEffect(() => {
    const inAuthGroup = segments[0] === Segments.Auth;
    if (user == null && !inAuthGroup) {
      router.replace(Routes.Login);
    } else if (user != null && inAuthGroup) {
      router.replace(Routes.Dashboard);
    }
  }, [user, segments]);

  return (
    <AppContext.Provider
      value={{
        authState,
        dispatchAuth,
        payViewState,
        dispatchPayView,
        appDataState,
        dispatchAppData,
        profileViewState,
        dispatchProfileView,
        executePayState,
        dispatchExecutePay,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
