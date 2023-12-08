import { IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Dispatch, SetStateAction } from "react";

// @types.Contributor.ts
export type ContributorContextTypes = {
    web3auth: Web3Auth;
    setWeb3Auth: Dispatch<SetStateAction<Web3Auth | null>>;
    provider: IProvider;
    handleLogin: any;
    logout: any;
    authData: any;
    loadingSign: Boolean;
    authSuccess: Boolean;
    authError: any;
    authFetching: Boolean;
    authLoading: Boolean;
    fetchingLogin: Boolean;
    loginLoading: Boolean;
    wallet: string;
    connectedChain: string;
};
