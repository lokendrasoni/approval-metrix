import {
    Box,
    AppBar as MuiAppBar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
} from "@mui/material";
import {
    AuthKitSignInData,
    SafeAuthInitOptions,
    SafeAuthPack,
    SafeAuthUserInfo,
} from "@safe-global/auth-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import { useEffect, useState } from "react";
import AppBar from "./AppBar";

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

    const signAndExecuteSafeTx = async (index: number) => {
        const safeAddress = safeAuthSignInResponse?.safes?.[index] || "0x";

        const provider = new BrowserProvider(safeAuthPack?.getProvider() as Eip1193Provider);
        const signer = await provider.getSigner();
        const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: signer,
        });
        const protocolKit = await Safe.create({
            safeAddress,
            ethAdapter,
        });

        let tx = await protocolKit.createTransaction({
            transactions: [
                {
                    to: ethers.getAddress(safeAuthSignInResponse?.eoa || "0x"),
                    data: "0x",
                    value: ethers.parseUnits("0.0001", "ether").toString(),
                },
            ],
        });

        tx = await protocolKit.signTransaction(tx);

        const txResult = await protocolKit.executeTransaction(tx);
        uiConsole("Safe Transaction Result", txResult);
    };

    const signMessage = async (data: any, method: string) => {
        let signedMessage;

        const params = {
            data,
            from: safeAuthSignInResponse?.eoa,
        };

        if (method === "eth_signTypedData") {
            signedMessage = await provider?.send(method, [params.data, params.from]);
        } else if (method === "eth_signTypedData_v3" || method === "eth_signTypedData_v4") {
            signedMessage = await provider?.send(method, [
                params.from,
                JSON.stringify(params.data),
            ]);
        } else {
            signedMessage = await (await provider?.getSigner())?.signMessage(data);
        }

        uiConsole("Signed Message", signedMessage);
    };

    const sendTransaction = async () => {
        const tx = await provider?.send("eth_sendTransaction", [
            {
                from: safeAuthSignInResponse?.eoa,
                to: safeAuthSignInResponse?.eoa,
                value: ethers.parseUnits("0.00001", "ether").toString(),
                gasLimit: 21000,
            },
        ]);

        uiConsole("Transaction Response", tx);
    };

    const switchChain = async () => {
        const result = await provider?.send("wallet_switchEthereumChain", [
            {
                chainId: "0x1",
            },
        ]);

        uiConsole("Switch Chain", result);
    };

    const addChain = async () => {
        const result = await provider?.send("wallet_addEthereumChain", [
            {
                chainId: "0x2105",
                chainName: "Base",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                },
                rpcUrls: ["https://base.publicnode.com"],
                blockExplorerUrls: ["https://basescan.org/"],
            },
        ]);

        uiConsole(`Add chain`, result);
    };

    const uiConsole = (title: string, message: unknown) => {
        setConsoleTitle(title);
        setConsoleMessage(typeof message === "string" ? message : JSON.stringify(message, null, 2));
    };

    console.log(safeAuthSignInResponse, "obj");
    return (
        <>
            <Box sx={{ display: "flex", heigth: "100px" }}>
                <Box
                    sx={{
                        width: "70%",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "400px",
                    }}
                >
                    <StyledAppBar position="static" color="default">
                        <Typography variant="h3" pl={4} fontWeight={700}>
                            Auth Provider Demo
                        </Typography>
                    </StyledAppBar>
                </Box>
            </Box>
            <AppBar
                onLogin={login}
                onLogout={logout}
                userInfo={userInfo || undefined}
                isLoggedIn={!!safeAuthPack?.isAuthenticated}
                eoa={safeAuthSignInResponse?.eoa}
            />
            {safeAuthSignInResponse?.eoa && (
                <TableContainer
                    sx={{
                        marginTop: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                                        alignContent: "center",
                                        justifyContent: "center",
                                        fontSize: "30px",
                                    }}
                                >
                                    Safes
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
                                            fontWeight: "bold",
                                            display: "flex",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            fontSize: "30px",
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

const StyledAppBar = styled(MuiAppBar)`
    && {
        position: sticky;
        top: 0;
        background: ${({ theme }) => theme.palette.background.paper};
        height: 70px;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        border-bottom: 2px solid ${({ theme }) => theme.palette.background.paper};
        box-shadow: none;
    }
`;

export default SafeAuth;
