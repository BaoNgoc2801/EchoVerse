"use client";

import { createContext, useContext, useState } from "react";

interface TokenContextType {
    authToken: string;
    setAuthToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextType>({
    authToken: "",
    setAuthToken: () => {},
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState("");

    return (
        <TokenContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);