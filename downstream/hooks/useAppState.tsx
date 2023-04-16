import { useContext } from "react";
import { AppContext } from "../store";

export function useAppState() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }

  return context;
}
