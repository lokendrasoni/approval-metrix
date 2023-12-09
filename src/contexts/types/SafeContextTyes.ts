import SafeApiKit from "@safe-global/api-kit";
import { AuthKitSignInData, SafeAuthPack } from "@safe-global/auth-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { Dispatch, SetStateAction } from "react";

// @types.Contributor.ts
export type SafeContextTypes = {
    safeAddress: string;
    setSafeAddress: Function;
    safeAuthSignInResponse: AuthKitSignInData;
    setSafeAuthSignInResponse: Dispatch<SetStateAction<AuthKitSignInData | null>>;
    provider: any;
    setProvider: Function;
    ethAdapter: EthersAdapter;
    safeSdk: Safe;
    setSafeSdk: Function;
    setEthAdapter: Function;
    safeService: SafeApiKit;
    setSafeService: Function;
    tokensInSafe: any;
    safeAuthPack: SafeAuthPack;
    setSafeAuthPack: Function;
};
