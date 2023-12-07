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
import ConnectWalletPage from "src/modules/Welcome/ConnectWalletPage";
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


    useEffect(() => {
        if (!authData) {
            refetchCheckAuth();
        }
    }, []);

    useEffect(() => {
        // If no wallet is selected reset hasInitLogin
        if (!connectingWallet && hasInitLogin && !wallet) {
            setWalletConnectObject(walletConnectObject.current);
            setHasInitLogin(false);
        }

        if (wallet && account) {
            let loggedInWallet = lastLoggedInWallet?.toLowerCase();
            let isSameWallet = loggedInWallet === account?.toLowerCase();
            if (!isLoggedIn && !hasInitLogin) {
                // IF Last logged in account and current are same
                if (isSameWallet && !authFetching) {
                    // check auth and route to /hello
                    refetchCheckAuth();
                } else if (!isSameWallet) {
                    // Show account change modal
                    setShowChangeAccountModal(true);
                }
            } else if (isLoggedIn) {
                if (!isSameWallet) {
                    clearLocalStorage(false);
                }
                setShowChangeAccountModal(false);
            }
        }
    }, [
        authFetching,
        connectingWallet,
        hasInitLogin,
        lastLoggedInWallet,
        wallet,
        account,
        isLoggedIn,
        router,
    ]);

    const handleContinueLogin = async () => {
        setContinueLoading(true);
        const localStoragePreviousConnected: any = window.localStorage.getItem("connectedWallets");
        const previouslyConnectedWallets: any = JSON.parse(localStoragePreviousConnected);

        if (previouslyConnectedWallets?.length) {
            try {
                let connectWalletState = await connectWallet({
                    autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
                });
                console.log({ connectWalletState });
            } catch (error) {
                console.error("Error Autoconnecting wallet");
                console.error(error);
                setContinueLoading(false);
            }
        } else {
            setContinueLoading(false);
        }
    };
    const handleLogin = async () => {
        setHasInitLogin(true);
        let wcObj = getWalletConnectObject();
        if (wcObj) {
            walletConnectObject.current = wcObj;
            window.localStorage.removeItem(WALLETCONNECT);
        }
        await connectWallet();
    };

    return (
        <ConnectWalletPage
            showContinue={showContinue}
            handleContinueLogin={handleContinueLogin}
            authData={authData}
            nameText={nameText}
            lastLoggedInWalletName={lastLoggedInWalletName}
            continueLoading={continueLoading}
            loadingSign={loadingSign}
            fetchingLogin={fetchingLogin}
            connectingWallet={connectingWallet}
            account={account}
            handleLogin={handleLogin}
            rememberLogin={rememberLogin}
            setRememberLogin={setRememberLogin}
        />
    );
}
