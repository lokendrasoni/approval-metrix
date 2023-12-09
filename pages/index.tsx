/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { LAST_LOGGEDIN_WALLET, WALLETCONNECT } from "src/constants/localStorage";
import WalletContext from "src/contexts/Walletcontext";
import useLocalStorage from "src/hooks/useLocalStorage";

import SafeAuth from "src/modules/Welcome/SafeAuth";

export default function Home() {
    // Getting all values from localStorage
    const walletConnectObject = useRef(null);
    const [, setWalletConnectObject, getWalletConnectObject] = useLocalStorage(WALLETCONNECT, null);
    const [lastLoggedInWallet, ,] = useLocalStorage(LAST_LOGGEDIN_WALLET, null);

    const {
        connectWallet,
        wallet,
        account,
        isLoggedIn,
        loadingSign,
        fetchingLogin,
        rememberLogin,
        setRememberLogin,
        connectingWallet,
        authData,
        refetchCheckAuth,
        authFetching,
        setShowChangeAccountModal,
        hasInitLogin,
        setHasInitLogin,
    }: any = useContext(WalletContext);

    const router = useRouter();

    return <SafeAuth />;
}
