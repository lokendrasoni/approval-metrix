/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import useLoginV3 from "src/hooks/useLogin";
import { useCheckAuth } from "src/queries/auth/api";

import { EthAdapter } from "@safe-global/safe-core-sdk-types";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { useRouter } from "next/router";
import { LAST_LOGGEDIN_NETWORK, LAST_LOGGEDIN_WALLET } from "src/constants/localStorage";
import { initWeb3Onboard } from "src/helpers/onboard/initWeb3Onboard";
import useLocalStorage from "src/hooks/useLocalStorage";
import { useLoginapi, useLogoutapi } from "src/queries/onboard/api";
import { checkAccountAddress } from "utils/authentication";
const WalletContext = createContext({});

// Wallet and Auth Context
export function WalletcontextProvider({ children }) {
    const [, , getLastLoggedInNetwork] = useLocalStorage(LAST_LOGGEDIN_NETWORK, "");
    const [, , getLastLoggedInWallet] = useLocalStorage(LAST_LOGGEDIN_WALLET, "");
    const router = useRouter();
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [{ connectedChain, settingChain }, setChain] = useSetChain();
    const connectedWallets = useWallets();
    const [provider] = useState(null);
    const [isHardwareWallet, setIsHardwareWallet] = useState(false);
    const [isGnosisWallet, setIsGnosisWallet] = useState(false);
    const [, setWeb3Onboard] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isArgentWallet, setIsArgentWallet] = useState(false);
    // const [showPopuptoCallLoginAgain, setShowPopupToCallLoginAgain] = useState(false);
    const [signedMessage, setSignedMessage] = useState("");
    const [message, setMessage] = useState(null);
    const [callLogin, setCallLogin] = useState(false);
    const [safeSwitchFromSideDrawer, setSafeSwitchFromSideDrawer] = useState(false);
    const [rememberLogin, setRememberLogin] = useState(true);
    const [continueLoading, setContinueLoading] = useState(false);

    const [hasInitLogin, setHasInitLogin] = useState(false);

    const [showChangeNetworkModal, setShowChangeNetworkModal] = useState(false);
    const [showChangeAccountModal, setShowChangeAccountModal] = useState(false);

    const [redirectedToManagePayrollPolicy, setRedirectedToManagePayrollPolicy] = useState(false);
    const [redirectedToActivateOrganisation, setRedirectedToActivateOrganisation] = useState(false);

    const { loadingSign, triggerLogin } = useLoginV3();
    const [ethAdapter] = useState<EthAdapter>(null);

    // call again when signed message changes
    useEffect(() => {
        if (signedMessage && callLogin) {
            refetchLogin();
            setCallLogin(false);
        }
    }, [signedMessage, callLogin]);
    const { refetch: clearCookieV3 } = useLogoutapi({
        enabled: false,
        onSuccess: () => {
            setIsLoggedIn(false);
        },
    });
    const {
        refetch: refetchCheckAuth,
        data: authData,
        isSuccess: authSuccess,
        isError: authError,
        isFetching: authFetching,
        isLoading: authLoading,
    } = useCheckAuth({
        enabled: Boolean(wallet && provider),
        cacheTime: 0,
        retry: false,
        refetchOnMount: false,
        retryOnMount: false,
        onSuccess: data => {
            // router.push("/");
            if (checkAccountAddress(wallet) && connectedChain?.id) {
                let loggedInWalletAddress = data?.walletAddress
                    ? ethers.getAddress(data?.walletAddress)
                    : "";
                let selectedWalletAddress = ethers.getAddress(wallet?.accounts[0]?.address);

                let isLoggedIn = data?.success && loggedInWalletAddress === selectedWalletAddress;

                setIsLoggedIn(isLoggedIn);

                // Check if USER has click on login and is not logged in
                if (!isLoggedIn) {
                    if (router.pathname !== "/" && !router.pathname.startsWith("/migration")) {
                        router.push("/");
                    }

                    if (hasInitLogin) {
                        triggerLogin({
                            account: ethers.getAddress(wallet?.accounts[0]?.address),
                            chainIdDecimal: parseInt(connectedChain?.id, 16),
                            provider,
                            setSignedMessage,
                            setMessage,
                            disconnect,
                            setCallLogin,
                            callLogin,
                        });
                    }
                    // console.log("here", router.pathname);
                    // if (router.pathname !== "/hello") {
                    //     router.push("/");
                    // }
                }
            }
        },

        onError: () => {
            router.push("/");
            setIsLoggedIn(false);
            triggerLogin({
                account: ethers.getAddress(wallet?.accounts[0]?.address),
                chainIdDecimal: parseInt(connectedChain?.id, 16),
                provider,
                setSignedMessage,
                setMessage,
                disconnect,
                setCallLogin,
                callLogin,
            });
        },
    });

    const onSuccessLogin = async data => {
        if (data?.hasOwnProperty("success")) {
            if (data.success) {
                await refetchCheckAuth();
            } else {
                setSignedMessage(null);
            }
        }
    };

    const {
        refetch: refetchLogin,
        isFetching: fetchingLogin,
        isLoading: loginLoading,
    } = useLoginapi(
        {
            signedMessage,
            walletAddress: checkAccountAddress(wallet)
                ? ethers?.getAddress(wallet?.accounts[0]?.address)
                : "",
            networkId: parseInt(connectedChain?.id, 16),
            isArgentWallet,
            isGnosisWallet,
            message,
            rememberLogin,
        },
        {
            enabled:
                !!signedMessage &&
                checkAccountAddress(wallet) &&
                Boolean(parseInt(connectedChain?.id, 16)) &&
                callLogin,
            onSuccess: onSuccessLogin,
        },
    );

    useEffect(() => {
        setWeb3Onboard(initWeb3Onboard);
    }, []);

    useEffect(() => {
        let lastLoggedInWallet = getLastLoggedInWallet();
        // call when accounts change
        if (lastLoggedInWallet && wallet) {
            let currentAccount = wallet?.accounts[0]?.address;
            if (
                router.pathname !== "/" &&
                currentAccount?.toLowerCase() !== lastLoggedInWallet?.toLowerCase()
            ) {
                // When user changes wallet show modal
                setShowChangeAccountModal(true);
            } else if (
                showChangeAccountModal &&
                currentAccount?.toLowerCase() === lastLoggedInWallet?.toLowerCase()
            ) {
                // When modal is open and user goes back to previous wallet hide modal
                setShowChangeAccountModal(false);
            }
            // refetchCheckAuth();
        }
    }, [wallet?.accounts[0]?.address]);

    useEffect(() => {
        /**
         * Doing this because of Wallet connect, as it logs the user in with multi chain support and does not as the user for any confirmation to change the chain on their app and directly changes the chain.
         * When we switch to a safe on a different network/chain this effect gets called first and then the localstorage is updated.
         */
        setTimeout(() => {
            let lastLoggedInNetwork = getLastLoggedInNetwork();
            // call when chainId change
            if (connectedChain?.id && lastLoggedInNetwork) {
                if (
                    router.pathname !== "/" &&
                    connectedChain?.id != lastLoggedInNetwork &&
                    router.pathname !== "/hello" &&
                    !router.pathname.startsWith("/contributor") &&
                    router.pathname !== "/onboard/safes" &&
                    !safeSwitchFromSideDrawer
                ) {
                    setShowChangeNetworkModal(true);
                    // window?.localStorage?.removeItem(LAST_LOGGEDIN_NETWORK);
                    // router.push("/");
                    // window?.localStorage?.removeItem(LAST_LOGGEDIN_WALLET);
                } else if (showChangeNetworkModal && connectedChain?.id == lastLoggedInNetwork) {
                    setShowChangeNetworkModal(false);
                }

                // Reset safeSwitchFromSideDrawer
                if (safeSwitchFromSideDrawer) {
                    setSafeSwitchFromSideDrawer(false);
                }

                // refetchCheckAuth();
            }
        }, 0);
    }, [connectedChain?.id]);

    // useEffect(() => {
    //   console.log(notifications);
    // }, [notifications]);

    useEffect(() => {
        if (wallet?.label === "Gnosis Safe Multisig") {
            setIsGnosisWallet(true);

            setSignedMessage("0x");
        }
        if (wallet?.label === "Argent") {
            setIsArgentWallet(true);
        }
    }, [wallet]);

    useEffect(() => {
        if (!connectedWallets.length) return;
        const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);
        window.localStorage.setItem("connectedWallets", JSON.stringify(connectedWalletsLabelArray));
    }, [connectedWallets, wallet]);
    // Check for Magic Wallet user session

    // useEffect(() => {
    //     const localStoragePreviousConnected: any = window.localStorage.getItem("connectedWallets");
    //     const previouslyConnectedWallets: any = JSON.parse(localStoragePreviousConnected);
    //     async function setWalletFromLocalStorage() {
    //         const walletConnected = await connect({
    //             autoSelect: previouslyConnectedWallets[0],
    //         });
    //     }

    //     if (previouslyConnectedWallets?.length) {
    //         setWalletFromLocalStorage();
    //     }
    // }, [connect]);

    // const { setCoordinapeToken }: any = useContext(IntegrationContext);

    useEffect(() => {
        if (wallet?.label) {
            if (wallet?.label === "Ledger" || wallet?.label === "Trezor") {
                setIsHardwareWallet(true);
            } else {
                setIsHardwareWallet(false);
            }
        }
    }, [wallet]);

    useEffect(() => {
        if (router.pathname !== "/" && router.pathname !== `/hello` && continueLoading) {
            setContinueLoading(false);
        }
    }, [router.pathname]);
    return (
        <WalletContext.Provider
            value={{
                connectingWallet: connecting,
                connectWallet: connect,
                disconnectWallet: disconnect,
                chainIdDecimal:
                    wallet && connectedChain?.id ? parseInt(connectedChain?.id, 16) : null,
                chainId: wallet ? connectedChain?.id : null,
                account: checkAccountAddress(wallet)
                    ? ethers.getAddress(wallet?.accounts[0]?.address)
                    : "",
                setChain,
                balance: wallet?.accounts[0]?.balance,
                ens: wallet?.accounts[0]?.ens,
                provider: provider,
                wallet: wallet,
                isHardwareWallet,
                isGnosisWallet,
                setIsGnosisWallet,
                authSuccess,
                authData,
                authError,
                authFetching,
                authLoading,
                isLoggedIn,
                refetchCheckAuth,
                loadingSign,
                clearCookieV3,
                fetchingLogin,
                loginLoading,
                settingChain,
                safeSwitchFromSideDrawer,
                setSafeSwitchFromSideDrawer,
                rememberLogin,
                setRememberLogin,
                setShowChangeNetworkModal,
                showChangeNetworkModal,
                showChangeAccountModal,
                setShowChangeAccountModal,
                hasInitLogin,
                setHasInitLogin,
                continueLoading,
                setContinueLoading,
                redirectedToManagePayrollPolicy,
                setRedirectedToManagePayrollPolicy,
                redirectedToActivateOrganisation,
                setRedirectedToActivateOrganisation,
                ethAdapter,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export default WalletContext;

