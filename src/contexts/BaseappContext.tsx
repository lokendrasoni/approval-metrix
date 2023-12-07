import SafeApiKit from "@safe-global/api-kit";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import {
    getAllownceModuleContractAddress,
    getMultisendContractAddress,
    getProxyFactoryContractAddress,
} from "src/helpers/address";
import { getBlockExplorerURL } from "src/helpers/etherscan";
import { getGnosisBaseURL, getGnosisUrlByNetworkId } from "src/helpers/gnosisUrl";
import { getNativeIconUrl, getNativeTokenName, getNativeTokenSymbol } from "src/helpers/token";
import { hasQueryPrams, removeQueryParam } from "src/helpers/utils/common";
import WalletContext from "./Walletcontext";
import { BaseAppContextType } from "./types/BaseappContextTypes";

// This context store and manages global state that might need for the app
// First level Children of WalletContext
const BaseappContext = createContext<BaseAppContextType | {}>({});

export function BaseappContextProvider({ children }) {
    const router = useRouter();
    // gnosis API endpoint - calculated with networkId context
    const { chainIdDecimal, ethAdapter }: any = useContext(WalletContext);
    const [gnosisApiEndpoint, setGnosisApiEndpoint] = useState("");
    const [nativeTokenSymbol, setNativeTokenSymbol] = useState("");
    const [nativeTokenName, setNativeTokenName] = useState("");
    const [nativeIconUrl, setNativeIconUrl] = useState("");
    const [etherscan, setEtherscan] = useState("");
    const [safeService, setSafeService] = useState(null);
    const [proxyFactoryContractAddress, setProxyFactoryContractAddress] = useState("");
    const [allowanceModuleContractAddress, setAllowanceModuleContractAddress] = useState("");
    const [multisendContractAddress, setMultisendContractAddress] = useState("");
    const [baseContextNetworkId, setBaseContextNetworkId] = useState(null);
    const [showPreLoader, setShowPreLoader] = useState<boolean>(false);

    // Query params
    const [searchString, setSearchString] = useState<string>(null);
    const [selectedTab, setSelectedTab] = useState<number>(null);

    useEffect(() => {
        if (router) {
            let hasParams = hasQueryPrams(router, ["tab", "search"]);
            if (hasParams) {
                let query = router?.query;
                let search = (query?.search as string) || null;
                let tab = !isNaN(+query?.tab) ? +query?.tab : null;
                setSelectedTab(tab);
                setSearchString(search);
                if (tab || search) {
                    removeQueryParam(router, "tab", "search");
                }
            }
        }
    }, [router]);
    useEffect(() => {
        router?.events.on("routeChangeStart", (url, { shallow }) => {
            let currentPath = router.pathname;
            if (!shallow && currentPath !== url) {
                setSearchString(null);
                setSelectedTab(null);
            }
        });
        return () => router?.events.off("routeChangeStart", () => {});
    }, []);

    useEffect(() => {
        if (chainIdDecimal && ethAdapter) {
            setGnosisApiEndpoint(getGnosisUrlByNetworkId(chainIdDecimal));
            setNativeTokenSymbol(getNativeTokenSymbol(chainIdDecimal));
            setNativeTokenName(getNativeTokenName(chainIdDecimal));
            setNativeIconUrl(getNativeIconUrl(chainIdDecimal));
            setEtherscan(getBlockExplorerURL(chainIdDecimal));
            const safeService = new SafeApiKit({
                txServiceUrl: getGnosisBaseURL(chainIdDecimal),
                ethAdapter,
            });
            setSafeService(safeService);

            setProxyFactoryContractAddress(getProxyFactoryContractAddress(chainIdDecimal));
            setAllowanceModuleContractAddress(getAllownceModuleContractAddress(chainIdDecimal));
            setMultisendContractAddress(getMultisendContractAddress(chainIdDecimal));
            setBaseContextNetworkId(chainIdDecimal);
        }
    }, [chainIdDecimal, ethAdapter]);

    return (
        <BaseappContext.Provider
            value={{
                gnosisApiEndpoint: gnosisApiEndpoint,
                nativeTokenSymbol: nativeTokenSymbol,
                nativeTokenName: nativeTokenName,
                nativeIconUrl: nativeIconUrl,
                etherscan,
                safeService,
                allowanceModuleContractAddress,
                multisendContractAddress,
                baseContextNetworkId,
                proxyFactoryContractAddress,
                showPreLoader,
                setShowPreLoader,
                searchString,
                setSearchString,
                selectedTab,
                setSelectedTab,
            }}
        >
            {children}
        </BaseappContext.Provider>
    );
}

export default BaseappContext;
