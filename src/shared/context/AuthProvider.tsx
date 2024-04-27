import { ReactNode, createContext, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
const AuthContext = createContext({});

type AuthProviderProps = {
    children: ReactNode;
};

export type AuthContextType = {
    authClient: AuthClient
};

const authClient = await AuthClient.create()

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthContextType>({ authClient });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;