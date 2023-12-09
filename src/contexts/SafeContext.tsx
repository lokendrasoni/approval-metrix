import { createContext, useState } from "react";
import { SafeContextTypes } from "./types/SafeContextTyes";

const SafeContext = createContext<SafeContextTypes | {}>({});

export function SafeContextProvider({ children }) {
    const [safeAddress, setSafeAddress] = useState<string>("");
    return (
        <SafeContext.Provider
            value={{
                safeAddress,
                setSafeAddress,
            }}
        >
            {children}
        </SafeContext.Provider>
    );
}

export default SafeContext;
