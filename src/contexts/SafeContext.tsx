import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { SafeContextTypes } from "./types/SafeContextTyes";
import { useGetTokensAndPriceBySafe } from "src/queries/tokens/api";
import { WHITELISTED_TOKENS } from "src/queries/constants";

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

    const [tokensInSafe, setTokensInSafe] = useState({});
    const { data, isSuccess, isError, isLoading } = useGetTokensAndPriceBySafe(
        "https://safe-transaction-goerli.safe.global/api/v1",
        safeAddress,
        {
            enabled: Boolean(safeAddress),
            retry: true,
            refetchOnMount: true,
            retryOnMount: true,
            refetchOnWindowFocus: true,
            refetchInterval: 80000, // 10 seconds
        },
    );

    useEffect(() => {
        if (data && isSuccess && Array.isArray(data) && !isLoading && !isError) {
            resolvingTokensInSafe(
                data,
                setTokensInSafe,
                5,
                "Görli Ether",
                "gETH",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
            );
        }
    }, [data, isSuccess, isError, isLoading, safeAddress]);

    const resolvingTokensInSafe = (
        data,
        setTokensInSafe,
        currentSafeNetworkId,
        nativeTokenName,
        nativeTokenSymbol,
        nativeIconUrl,
    ) => {
        let tokenData = data.map(token => {
            if (token.token) {
                const logoURL =
                    Object.keys(WHITELISTED_TOKENS).includes(token.tokenAddress) &&
                    currentSafeNetworkId == 5
                        ? WHITELISTED_TOKENS[token.tokenAddress].logoURI
                        : token?.token?.logoUri;
                let isBrokenkenLogo = false; // removed default 'true' to fix broken logo issue on quick load
                return {
                    ...token.token,
                    logoUri: logoURL,
                    tokenAddress: token.tokenAddress,
                    brokenLogo: !!isBrokenkenLogo,
                    spendingLimitMaxValue: 0,
                    spent: 0,
                    totalLimit: 0,
                    remainingLimit: 0,
                };
            } else {
                return {
                    name: nativeTokenName,
                    symbol: nativeTokenSymbol,
                    logoUri: nativeIconUrl,
                    decimals: 18,
                    tokenAddress: nativeTokenSymbol,
                    brokenLogo: false,
                    spendingLimitMaxValue: 0,
                    spent: 0,
                    totalLimit: 0,
                    remainingLimit: 0,
                };
            }
        });
        let result = tokenData.reduce((agg, tokenItem) => {
            agg[tokenItem.tokenAddress] = tokenItem;
            return agg;
        }, {});
        setTokensInSafe(result);
    };

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
                tokensInSafe,
            }}
        >
            {children}
        </SafeContext.Provider>
    );
}

export default SafeContext;
