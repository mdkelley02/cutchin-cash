import React, { createContext, useState, useContext } from "react";

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  subject: string | null;
  setSubject: (subject: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  subject: null,
  setSubject: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, subject, setSubject }}>
      {children}
    </AuthContext.Provider>
  );
}
