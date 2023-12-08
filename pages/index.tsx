/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { LAST_LOGGEDIN_WALLET, WALLETCONNECT } from "src/constants/localStorage";
import WalletContext from "src/contexts/Walletcontext";
import useLocalStorage from "src/hooks/useLocalStorage";
import ConnectWalletPage from "src/modules/Welcome/ConnectWalletPage";
import { clearLocalStorage } from "utils/authentication";

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
