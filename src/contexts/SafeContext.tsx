import { createContext, useState } from "react";
import { SafeContextTypes } from "./types/SafeContextTyes";

const safeContext = createContext<SafeContextTypes | {}>({});

export function SafeContext({ children }) {
    const [safeAddress, setSafeAddress] = useState<string>("");
    return (
        <safeContext.Provider
            value={{
                safeAddress,
            }}
        >
            {children}
        </safeContext.Provider>
    );
}
