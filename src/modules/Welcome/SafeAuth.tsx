import { useEffect, useState } from "react";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import AppBar from "./AppBar";
import {
    AuthKitSignInData,
    SafeAuthInitOptions,
    SafeAuthPack,
    SafeAuthUserInfo,
} from "@safe-global/auth-kit";

const SafeAuth = () => {
    const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack | undefined>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!safeAuthPack?.isAuthenticated,
    );
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
        null,
    );
    const [userInfo, setUserInfo] = useState<SafeAuthUserInfo | null>(null);
    const [chainId, setChainId] = useState<string | undefined>();
    const [balance, setBalance] = useState<string | undefined>();
    const [consoleMessage, setConsoleMessage] = useState<string>("");
    const [consoleTitle, setConsoleTitle] = useState<string>("");
    const [provider, setProvider] = useState<BrowserProvider | undefined>();

    useEffect(() => {
        const initAuthPack = async () => {
            try {
                // Check if the code is running in the browser

                if (typeof window !== "undefined") {
                    const { SafeAuthPack } = await import("@safe-global/auth-kit");
                    const options: SafeAuthInitOptions = {
                        enableLogging: true,
                        buildEnv: "production",
                        chainConfig: {
                            chainId: chainId || "0x5",
                            rpcTarget: "https://gnosis.drpc.org",
                        },
                    };

                    const authPack = new SafeAuthPack();

                    await authPack.init(options);

                    console.log("safeAuthPack:safeEmbed", authPack.safeAuthEmbed);
                    console.log("authPack", authPack);

                    setSafeAuthPack(authPack);

                    authPack.subscribe("accountsChanged", async accounts => {
                        console.log(
                            "safeAuthPack:accountsChanged",
                            accounts,
                            authPack.isAuthenticated,
                        );
                        if (authPack.isAuthenticated) {
                            const signInInfo = await authPack?.signIn();
                            setSafeAuthSignInResponse(signInInfo);
                            setIsAuthenticated(true);
                        }
                    });

                    authPack.subscribe("chainChanged", eventData =>
                        console.log("safeAuthPack:chainChanged", eventData),
                    );
                }
            } catch (err) {
                console.log("error in useEffect ---- ", err);
            }
        };

        console.log("loggedin clicked");
        if (typeof window !== "undefined") initAuthPack();
    }, []);

    useEffect(() => {
        if (!safeAuthPack || !isAuthenticated) return;

        const safeAuthCheckFunc = async () => {
            const web3Provider = safeAuthPack.getProvider();
            const userInfo = await safeAuthPack.getUserInfo();

            setUserInfo(userInfo);

            if (web3Provider) {
                const provider = new BrowserProvider(safeAuthPack.getProvider() as Eip1193Provider);
                const signer = await provider.getSigner();
                const signerAddress = await signer.getAddress();

                setChainId((await provider?.getNetwork()).chainId.toString());
                setBalance(
                    ethers.formatEther(
                        (await provider.getBalance(signerAddress)) as ethers.BigNumberish,
                    ),
                );
                setProvider(provider);
            }
        };
        safeAuthCheckFunc();
    }, [isAuthenticated]);

    const login = async () => {
        const signInInfo = await safeAuthPack?.signIn();
        console.log("signInInfo --- ", signInInfo);
        setSafeAuthSignInResponse(signInInfo);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await safeAuthPack?.signOut();
        setSafeAuthSignInResponse(null);
    };

    const getUserInfo = async () => {
        const userInfo = await safeAuthPack?.getUserInfo();

        uiConsole("User Info", userInfo);
    };

    const getAccounts = async () => {
        const accounts = await provider?.send("eth_accounts", []);

        uiConsole("Accounts", accounts);
    };

    const getChainId = async () => {
        const chainId = await provider?.send("eth_chainId", []);

        uiConsole("ChainId", chainId);
    };

    const uiConsole = (title: string, message: unknown) => {
        setConsoleTitle(title);
        setConsoleMessage(typeof message === "string" ? message : JSON.stringify(message, null, 2));
    };

    return (
        <>
            <AppBar
                onLogin={login}
                onLogout={logout}
                userInfo={userInfo || undefined}
                isLoggedIn={!!safeAuthPack?.isAuthenticated}
            />
            {
                safeAuthSignInResponse?.eoa && <div>Hello</div>
                // <Grid container>
                //     <Grid item md={4} p={4}>
                //         <Typography variant="h3" color="secondary" fontWeight={700}>
                //             Signer
                //         </Typography>
                //         <Divider sx={{ my: 3 }} />
                //         <EthHashInfo
                //             address={safeAuthSignInResponse.eoa}
                //             showCopyButton
                //             showPrefix={false}
                //         />
                //         <Divider sx={{ my: 2 }} />
                //         <Typography variant="h4" color="primary" fontWeight="bold">
                //             Chain{" "}
                //             <Typography component="span" color="secondary" fontSize="1.45rem">
                //                 {chainId}
                //             </Typography>
                //         </Typography>
                //         <Typography variant="h4" color="primary" sx={{ my: 1 }} fontWeight="bold">
                //             Balance{" "}
                //             <Typography component="span" color="secondary" fontSize="1.45rem">
                //                 {balance}
                //             </Typography>
                //         </Typography>
                //         <Divider sx={{ my: 2 }} />
                //         <Button
                //             variant="contained"
                //             fullWidth
                //             color="secondary"
                //             sx={{ my: 1 }}
                //             onClick={() => getUserInfo()}
                //         >
                //             getUserInfo
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() => getAccounts()}
                //         >
                //             eth_accounts
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() => getChainId()}
                //         >
                //             eth_chainId
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() => signMessage("Hello World", "personal_sign")}
                //         >
                //             personal_sign
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() =>
                //                 signMessage(
                //                     "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad",
                //                     "eth_sign",
                //                 )
                //             }
                //         >
                //             eth_sign
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() => signMessage(getTypedData(), "eth_signTypedData")}
                //         >
                //             eth_signTypedData
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() =>
                //                 signMessage(getV3TypedData(chainId || ""), "eth_signTypedData_v3")
                //             }
                //         >
                //             eth_signTypedData_v3
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() =>
                //                 signMessage(
                //                     getSafeTxV4TypedData(chainId || ""),
                //                     "eth_signTypedData_v4",
                //                 )
                //             }
                //         >
                //             eth_signTypedData_v4
                //         </Button>
                //         <Button
                //             fullWidth
                //             variant="contained"
                //             color="primary"
                //             sx={{ my: 1 }}
                //             onClick={() => sendTransaction()}
                //         >
                //             eth_sendTransaction
                //         </Button>
                //         <Divider sx={{ my: 2 }} />
                //         <Button
                //             variant="outlined"
                //             fullWidth
                //             color="secondary"
                //             sx={{ my: 1 }}
                //             onClick={() => switchChain()}
                //         >
                //             wallet_switchEthereumChain
                //         </Button>{" "}
                //         <Button
                //             variant="outlined"
                //             fullWidth
                //             color="secondary"
                //             sx={{ my: 1 }}
                //             onClick={() => addChain()}
                //         >
                //             wallet_addEthereumChain
                //         </Button>
                //     </Grid>
                //     <Grid item md={3} p={4}>
                //         <>
                //             <Typography variant="h3" color="secondary" fontWeight={700}>
                //                 Safe accounts
                //             </Typography>
                //             <Divider sx={{ my: 2 }} />
                //             {safeAuthSignInResponse?.safes?.length ? (
                //                 safeAuthSignInResponse?.safes?.map((safe, index) => (
                //                     <>
                //                         <Box sx={{ my: 3 }} key={index}>
                //                             <EthHashInfo
                //                                 address={safe}
                //                                 showCopyButton
                //                                 shortAddress={true}
                //                             />
                //                         </Box>
                //                         <Button
                //                             variant="contained"
                //                             fullWidth
                //                             color="primary"
                //                             onClick={() => signAndExecuteSafeTx(index)}
                //                         >
                //                             Sign and execute
                //                         </Button>
                //                         <Divider sx={{ my: 3 }} />
                //                     </>
                //                 ))
                //             ) : (
                //                 <Typography variant="body1" color="secondary" fontWeight={700}>
                //                     No Available Safes
                //                 </Typography>
                //             )}
                //         </>
                //     </Grid>
                //     <Grid item md={5} p={4}>
                //         <Typography variant="h3" color="secondary" fontWeight={700}>
                //             Console
                //         </Typography>
                //         <Divider sx={{ my: 2 }} />
                //         <Typography variant="body1" color="primary" fontWeight={700}>
                //             {consoleTitle}
                //         </Typography>
                //         <Typography
                //             variant="body1"
                //             color="secondary"
                //             sx={{ mt: 2, overflowWrap: "break-word" }}
                //         >
                //             {consoleMessage}
                //         </Typography>
                //     </Grid>
                // </Grid>
            }
        </>
    );
};

export default SafeAuth;
