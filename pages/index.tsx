/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef } from "react";
import {
    LAST_LOGGEDIN_WALLET,
    LAST_LOGGEDIN_WALLET_NAME,
    WALLETCONNECT,
} from "src/constants/localStorage";
import WalletContext from "src/contexts/Walletcontext";
import { minifyAddress } from "src/helpers/utils/web3Utils";
import useLocalStorage from "src/hooks/useLocalStorage";

import SafeAuth from "src/modules/Welcome/SafeAuth";
import { clearLocalStorage } from "utils/authentication";

export default function Home() {
    // Getting all values from localStorage
    const walletConnectObject = useRef(null);
    const [, setWalletConnectObject, getWalletConnectObject] = useLocalStorage(WALLETCONNECT, null);
    const [lastLoggedInWalletName, ,] = useLocalStorage(LAST_LOGGEDIN_WALLET_NAME, null);
    const [lastLoggedInWallet, , getLastLoggedInWallet] = useLocalStorage(
        LAST_LOGGEDIN_WALLET,
        null,
    );

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
        continueLoading,
        setContinueLoading,
    }: any = useContext(WalletContext);

    const nameText = useMemo(() => {
        return lastLoggedInWalletName || minifyAddress(authData?.walletAddress);
    }, [lastLoggedInWalletName, authData]);

    const showContinue = getLastLoggedInWallet() && authData?.success;
    // &&
    // !hasInitLogin &&
    // (!wallet?.accounts[0]?.address ||
    //     authData?.walletAddress.toLowerCase() === wallet?.accounts[0]?.address.toLowerCase());

    const router = useRouter();

    return <SafeAuth />;
}
