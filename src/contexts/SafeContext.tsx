import { AuthKitSignInData } from "@safe-global/auth-kit";
import { createContext, useState } from "react";
import { SafeContextTypes } from "./types/SafeContextTyes";

const SafeContext = createContext<SafeContextTypes | {}>({});

export function SafeContextProvider({ children }) {
    const [safeAddress, setSafeAddress] = useState<string>("");
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
        null,
    );

    return (
        <SafeContext.Provider
            value={{
                safeAddress,
                setSafeAddress,
                safeAuthSignInResponse,
                setSafeAuthSignInResponse,
            }}
        >
            {children}
        </SafeContext.Provider>
    );
}

export default SafeContext;
