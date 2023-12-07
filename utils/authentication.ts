import {
    LAST_LOGGEDIN_NETWORK,
    LAST_LOGGEDIN_ROLE,
    LAST_LOGGEDIN_SAFE,
    LAST_LOGGEDIN_SAFE_NAME,
    LAST_LOGGEDIN_WALLET,
    LAST_LOGGEDIN_WALLET_NAME,
    WALLETCONNECT,
} from "src/constants/localStorage";
import { ISafeSchema } from "./types/SafeModel";
import { IWalletWithMetaSchema } from "./types/WalletModel";

export const getRoles = (walletAddress: string, safe: ISafeSchema) => {
    let roles = [];
    if (
        safe?.operators?.find(
            (operator: IWalletWithMetaSchema) => operator?.wallet?.address == walletAddress,
        )
    ) {
        roles.push("operator");
    }

    return roles;
};

export const clearLocalStorage = (clearConnectedWallets = true) => {
    if (clearConnectedWallets) {
        window.localStorage.removeItem("connectedWallets");
    }
    window.localStorage.removeItem(LAST_LOGGEDIN_SAFE);
    window.localStorage.removeItem(LAST_LOGGEDIN_WALLET);
    window.localStorage.removeItem(LAST_LOGGEDIN_ROLE);
    window.localStorage.removeItem(LAST_LOGGEDIN_NETWORK);
    window.localStorage.removeItem(LAST_LOGGEDIN_SAFE_NAME);
    window.localStorage.removeItem(LAST_LOGGEDIN_WALLET_NAME);
    window.localStorage.removeItem(WALLETCONNECT);
};

export const checkAccountAddress = wallet => {
    return Boolean(wallet && wallet?.accounts[0]?.address && wallet?.accounts[0]?.address != "0");
};
