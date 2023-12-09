import { AuthKitSignInData } from "@safe-global/auth-kit";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { SafeContextTypes } from "./types/SafeContextTyes";

const SafeContext = createContext<SafeContextTypes | {}>({});

export function SafeContextProvider({ children }) {
    const router = useRouter();
    const [safeAddress, setSafeAddress] = useState<string>("");
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
        null,
    );

    useEffect(() => {
        if (router?.pathname !== "/" && router?.pathname?.startsWith("/dao") && !safeAddress) {
            router.replace("/");
        }
    }, [safeAddress, router]);

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
