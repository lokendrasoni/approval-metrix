import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { SafeContextTypes } from "./types/SafeContextTyes";

const SafeContext = createContext<SafeContextTypes | {}>({});

export function SafeContextProvider({ children }) {
    const router = useRouter();
    // const [safeAddress, setSafeAddress] = useState<string>("");
    const [safeAddress, setSafeAddress] = useLocalStorage("safeAddress", "");
    // const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
    //     null,
    // );
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useLocalStorage(
        "safeAuthSignInResponse",
        null,
    );

    useEffect(() => {
        if (router?.pathname !== "/" && router?.pathname?.startsWith("/dao") && !safeAddress) {
            router.replace("/");
        } else if (router?.pathname === "/dao/contributor" && safeAddress) {
            // router.replace("/dao/contributors");
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
