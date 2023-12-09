import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { initWeb3auth } from "src/helpers/onboard/initWeb3Auth";
import useLogin from "src/hooks/useLogin";
import { useCheckAuth } from "src/queries/auth/api";
import { useLoginapi, useLogoutapi } from "src/queries/onboard/api";
import RPC from "utils/ethersRPC";
import { ContributorContextTypes } from "./types/ContributorContextTypes";

const ContributorContext = createContext<ContributorContextTypes | {}>({});

export function ContributorContextProvider({ children }) {
    const router = useRouter();
    const { loadingSign, triggerLogin } = useLogin();
    const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<IProvider>(null);
    const [callLogin, setCallLogin] = useState<Boolean>(false);
    const [hasInitLogin, setHasInitLogin] = useState<Boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [signedMessage, setSignedMessage] = useState<string>("");
    const [message, setMessage] = useState<any>(null);
    const [wallet, setWallet] = useState<string>("");
    const [connectedChain, setConnectedChain] = useState<any>("");

    useEffect(() => {
        const init = async () => {
            try {
                setWeb3Auth(initWeb3auth);
                await initWeb3auth.initModal({
                    modalConfig: {
                        [WALLET_ADAPTERS.OPENLOGIN]: {
                            label: "openlogin",
                            loginMethods: {
                                google: {
                                    name: "google login",
                                    logoDark:
                                        "url to your custom logo which will shown in dark mode",
                                },
                                facebook: {
                                    name: "facebook login",
                                },
                            },
                            // setting it to false will hide all social login methods from modal.
                            showOnModal: true,
                        },
                    },
                });
            } catch (err) {
                console.error("Error while initiating web3auth", err.message);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if ((provider || isLoggedIn) && router.pathname === "/contributor") {
            router.replace("/contributor/home");
        } else if (
            !provider &&
            !isLoggedIn &&
            router.pathname !== "/contributor" &&
            router.pathname.startsWith("/contributor")) {
            router.replace("/contributor");
        }
    }, [provider, router, isLoggedIn]);

    const getUserInfo = useCallback(async () => {
        if (!provider) {
            console.error("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const chainId = await rpc.getChainId();
        const address = await rpc.getAccounts();

        console.log(address, chainId);
        setConnectedChain(chainId);
        setWallet(address);
    }, [provider]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    const { refetch: clearCookie } = useLogoutapi({
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
        enabled: !!wallet && !!provider,
        cacheTime: 0,
        retry: false,
        refetchOnMount: false,
        retryOnMount: false,
        onSuccess: data => {
            // router.push("/");
            if (wallet && connectedChain) {
                let loggedInWalletAddress = data?.walletAddress ? data?.walletAddress : "";
                let selectedWalletAddress = wallet;

                let isLoggedIn = data?.success && loggedInWalletAddress === selectedWalletAddress;

                setIsLoggedIn(isLoggedIn);

                // Check if USER has click on login and is not logged in
                if (!isLoggedIn) {
                    if (hasInitLogin) {
                        triggerLogin({
                            account: wallet,
                            chainIdDecimal: parseInt(connectedChain, 16),
                            provider,
                            setSignedMessage,
                            setMessage,
                            disconnect: logout,
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
            router.push("/contributor");
            setIsLoggedIn(false);
            triggerLogin({
                account: wallet,
                chainIdDecimal: parseInt(connectedChain, 16),
                provider,
                setSignedMessage,
                setMessage,
                disconnect: logout,
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
            walletAddress: wallet,
            networkId: parseInt(connectedChain, 16),
            isArgentWallet: false,
            isGnosisWallet: false,
            message,
            rememberLogin: false,
        },
        {
            enabled:
                !!signedMessage && !!wallet && Boolean(parseInt(connectedChain, 16)) && callLogin,
            onSuccess: onSuccessLogin,
        },
    );
    // call again when signed message changes
    useEffect(() => {
        if (signedMessage && callLogin) {
            refetchLogin();
            setCallLogin(false);
        }
    }, [signedMessage, callLogin, refetchLogin]);

    const handleLogin = async () => {
        if (!web3auth) {
            console.error("web3auth not initialized yet");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        setHasInitLogin(true);
    };
    const logout = async () => {
        if (!web3auth) {
            console.error("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        setProvider(null);
        clearCookie();
    };

    return (
        <ContributorContext.Provider
            value={{
                web3auth,
                setWeb3Auth,
                provider,
                handleLogin,
                logout,
                loadingSign,
                authData,
                authSuccess,
                authError,
                authFetching,
                authLoading,
                fetchingLogin,
                loginLoading,
                wallet,
                connectedChain,
            }}
        >
            {children}
        </ContributorContext.Provider>
    );
}

export default ContributorContext;
