import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { SafeAuthInitOptions, SafeAuthPack, SafeAuthUserInfo } from "@safe-global/auth-kit";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { theme } from "src/constants/colors";
import SafeContext from "src/contexts/SafeContext";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import AppBar from "./AppBar";
import { EthersAdapter } from "@safe-global/protocol-kit";

const SafeAuth = () => {
    const router = useRouter();
    const {
        safeAuthSignInResponse,
        setSafeAuthSignInResponse,
        setSafeAddress,
        setProvider,
        setEthAdapter,
        setSafeAuthPack,
        safeAuthPack,
    } = useContext(SafeContext) as SafeContextTypes;

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!safeAuthPack?.isAuthenticated,
    );
    const [userInfo, setUserInfo] = useState<SafeAuthUserInfo | null>(null);
    const [chainId, setChainId] = useState<string | undefined>();
    const [balance, setBalance] = useState<string | undefined>();

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
            console.log("userINfo", userInfo);

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

                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer,
                });

                setEthAdapter(ethAdapter);
            }
        };
        safeAuthCheckFunc();
    }, [isAuthenticated, safeAuthPack]);

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

    const isLoggedIn = !!safeAuthPack?.isAuthenticated;

    return (
        <>
            {isLoggedIn && (
                <Box
                    sx={{
                        display: "flex",
                        heigth: "200px",
                        paddingTop: "10px",
                        background: theme.grey[900],
                    }}
                >
                    <Box
                        sx={{
                            width: "70%",
                            display: "flex",
                            paddingLeft: "40px",
                        }}
                    >
                        <Typography variant="h3" fontWeight={700} sx={{ color: "white" }}>
                            Buildoors!
                        </Typography>
                    </Box>
                </Box>
            )}
            <AppBar
                onLogin={login}
                onLogout={logout}
                userInfo={userInfo || undefined}
                isLoggedIn={!!safeAuthPack?.isAuthenticated}
                eoa={safeAuthSignInResponse?.eoa}
            />
            {isLoggedIn && (
                <TableContainer
                    sx={{
                        marginTop: "40px",
                        display: "flex",
                        marginLeft: "40px",
                    }}
                >
                    <Table
                        sx={{
                            minWidth: 650,
                            border: "1px solid grey",
                            borderRadius: 10,
                            width: "50%",
                        }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        display: "flex",
                                        fontSize: "24px",
                                    }}
                                >
                                    Available Safes
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {safeAuthSignInResponse?.safes.map(i => (
                                <TableRow
                                    key={i}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            display: "flex",
                                            fontSize: "18px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "blue",
                                            },
                                        }}
                                        onClick={() => {
                                            setSafeAddress(i);
                                            router.push("/dao/contributors");
                                        }}
                                    >
                                        gor:{i}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default SafeAuth;
