import { User } from "../models/User.model";
import { useAppState } from "./useAppState";

export type Nullable<T> = T | null;

export function useUser() {
  const { appDataState, authState } = useAppState();

  function findUser(userId: Nullable<string>): Nullable<User> {
    if (userId == null) return null;
    return appDataState.users.find((u) => u.userId === userId) ?? null;
  }

  function isUserMe(userId: Nullable<string>): boolean {
    if (userId == null) return false;
    return authState.user?.userId === userId;
  }

  return {
    findUser,
    isUserMe,
  };
}
