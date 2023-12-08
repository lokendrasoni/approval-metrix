import {
    LAST_LOGGEDIN_NETWORK,
    LAST_LOGGEDIN_ROLE,
    LAST_LOGGEDIN_SAFE,
    LAST_LOGGEDIN_SAFE_NAME,
    LAST_LOGGEDIN_WALLET,
    LAST_LOGGEDIN_WALLET_NAME,
    WALLETCONNECT,
} from "src/constants/localStorage";

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
