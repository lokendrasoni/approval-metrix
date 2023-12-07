import SafeApiKit from "@safe-global/api-kit";
import { Dispatch, SetStateAction } from "react";

// @types.BaseApp.ts
export type BaseAppContextType = {
    gnosisApiEndpoint: string;
    nativeTokenSymbol: string;
    nativeTokenName: string;
    nativeIconUrl: string;
    etherscan: string;
    safeService: SafeApiKit;
    allowanceModuleContractAddress: string;
    multisendContractAddress: string;
    baseContextNetworkId: number | null;
    proxyFactoryContractAddress: string;
    showPreLoader: boolean;
    setShowPreLoader: Dispatch<SetStateAction<boolean>>;
    searchString: string;
    setSearchString: Dispatch<SetStateAction<string>>;
    selectedTab: number;
    setSelectedTab: Dispatch<SetStateAction<number>>;
};
