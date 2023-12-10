import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { getGnosisBaseURL } from "src/helpers/gnosisUrl";
import useLocalStorage from "src/hooks/useLocalStorage";
import { WHITELISTED_TOKENS } from "src/queries/constants";
import { useGetTokensAndPriceBySafe } from "src/queries/tokens/api";
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
    const [safeSdk, setSafeSdk] = useState<Safe>(null);

    const [provider, setProvider] = useState(null);
    // const [ethAdapter, setEthAdapter] = useState<EthersAdapter | null>(null);
    const [ethAdapter, setEthAdapter] = useLocalStorage("ethAdapter", null);
    // const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack | undefined>();
    const [safeAuthPack, setSafeAuthPack] = useLocalStorage("safeAuthPack", null);

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

    const [safeService, setSafeService] = useState<SafeApiKit | null>(null);

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

    useEffect(() => {
        async function logout() {
            await safeAuthPack?.signOut();
            router.push("/");
        }
        if (
            !ethAdapter ||
            (!safeAuthPack && router.pathname == "/dao/quick-send" && !safeAddress)
        ) {
            logout();
        }
    }, []);

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

    useEffect(() => {
        if (safeAddress && ethAdapter) {
            const safeService = new SafeApiKit({
                txServiceUrl: getGnosisBaseURL(5),
                chainId: BigInt(5),
            });
            setSafeService(safeService);
        }
    }, [safeAddress, ethAdapter]);

    const createSafeSDK = async (ethAdapter, safeAddress) => {
        if (ethAdapter !== null && safeAddress) {
            try {
                const safeSdk: Safe = await Safe.create({
                    ethAdapter: ethAdapter,
                    safeAddress,
                });
                setSafeSdk(safeSdk);
            } catch (err) {
                console.log("catch error in creating sdk");
                console.error(err);
            }
        } else {
            console.log("catch while before creating sdk");
            console.log({ ethAdapter, safeAddress });
        }
    };

    useEffect(() => {
        async function reInitialiseSdk() {
            const sdkAddress = await safeSdk?.getAddress();
            if (!safeSdk || !sdkAddress || sdkAddress !== safeAddress) {
                if (ethAdapter !== null && safeAddress) {
                    console.log("reinitialise sdk");
                    createSafeSDK(ethAdapter, safeAddress);
                }
            }
        }
        if (safeAddress) {
            reInitialiseSdk();
        }
    }, [safeAddress, ethAdapter, safeSdk]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                //assign interval to a variable to clear it.
                const sdkAddress = await safeSdk?.getAddress();
                if (safeAddress && (!safeSdk || !sdkAddress || sdkAddress !== safeAddress)) {
                    if (ethAdapter !== null && safeAddress) {
                        console.log("reinitialise sdk in interval");
                        createSafeSDK(ethAdapter, safeAddress);
                    }
                } else {
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.log("catching errorr", err);
            }
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <SafeContext.Provider
            value={{
                safeAddress,
                setSafeAddress,
                safeAuthSignInResponse,
                setSafeAuthSignInResponse,
                tokensInSafe,
                setProvider,
                provider,
                setEthAdapter,
                ethAdapter,
                setSafeService,
                safeService,
                safeSdk,
                setSafeSdk,
                safeAuthPack,
                setSafeAuthPack,
            }}
        >
            {children}
        </SafeContext.Provider>
    );
}

export default SafeContext;
