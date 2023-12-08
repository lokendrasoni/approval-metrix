import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";
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
                                    // it will hide the facebook option from the Web3Auth modal.
                                    showOnModal: false,
                                },
                            },
                            // setting it to false will hide all social login methods from modal.
                            showOnModal: true,
                        },
                    },
                });
                if (initWeb3auth.provider) {
                    setProvider(initWeb3auth.provider);
                }
            } catch (err) {
                console.error("Error while initiating web3auth", err.message);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if ((provider && router.pathname === "/contributor") || isLoggedIn) {
            router.replace("/contributor/home");
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
        setConnectedChain(chainId);
        setWallet(address);
    }, [provider]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    // call again when signed message changes
    useEffect(() => {
        if (signedMessage && callLogin) {
            refetchLogin();
            setCallLogin(false);
        }
    }, [signedMessage, callLogin]);

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
        enabled: Boolean(wallet && provider),
        cacheTime: 0,
        retry: false,
        refetchOnMount: false,
        retryOnMount: false,
        onSuccess: data => {
            // router.push("/");
            if (wallet && connectedChain?.id) {
                let loggedInWalletAddress = data?.walletAddress
                    ? ethers.getAddress(data?.walletAddress)
                    : "";
                let selectedWalletAddress = ethers.getAddress(wallet);

                let isLoggedIn = data?.success && loggedInWalletAddress === selectedWalletAddress;

                setIsLoggedIn(isLoggedIn);

                // Check if USER has click on login and is not logged in
                if (!isLoggedIn) {
                    if (router.pathname !== "/" && !router.pathname.startsWith("/migration")) {
                        router.push("/");
                    }

                    if (hasInitLogin) {
                        triggerLogin({
                            account: ethers.getAddress(wallet),
                            chainIdDecimal: parseInt(connectedChain?.id, 16),
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
            router.push("/");
            setIsLoggedIn(false);
            triggerLogin({
                account: ethers.getAddress(wallet),
                chainIdDecimal: parseInt(connectedChain?.id, 16),
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
            walletAddress: ethers?.getAddress(wallet),
            networkId: parseInt(connectedChain?.id, 16),
            isArgentWallet: false,
            isGnosisWallet: false,
            message,
            rememberLogin: false,
        },
        {
            enabled:
                !!signedMessage && wallet && Boolean(parseInt(connectedChain?.id, 16)) && callLogin,
            onSuccess: onSuccessLogin,
        },
    );

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
            value={{ web3auth, setWeb3Auth, provider, handleLogin, logout, loadingSign }}
        >
            {children}
        </ContributorContext.Provider>
    );
}

export default ContributorContext;
