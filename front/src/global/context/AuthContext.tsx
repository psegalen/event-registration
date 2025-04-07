import PocketBase from "pocketbase";
import { createContext, FC, useEffect, useState } from "react";

const pb = new PocketBase("http://127.0.0.1:8090");

export interface AuthContextProps {
  login: (username: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => Promise.resolve(false),
  isAuthenticated: false,
});

export const AuthProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    // Bugfix: pocketbase was inserting the token recursively in an object until the storage is full 
    const storageAuth = localStorage.getItem("pocketbase_auth");
    const storedAuth = storageAuth
      ? storageAuth.includes('token":')
        ? JSON.parse(storageAuth)
        : storageAuth
      : null;
    if (storedAuth) {
      pb.authStore.clear();
      pb.authStore.save(
        typeof storedAuth === "string" ? storedAuth : storedAuth.token
      );
      setIsAuthenticated(pb.authStore.isValid);
    }
  }, []);

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      await pb.collection("users").authWithPassword(username, password);
      localStorage.setItem("pocketbase_auth", pb.authStore.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Authentication failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,

        login: handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
