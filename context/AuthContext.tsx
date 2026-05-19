"use client"
import { User } from "@/types/User";
import { createContext, useContext } from "react";


const AuthContext = createContext<User>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
