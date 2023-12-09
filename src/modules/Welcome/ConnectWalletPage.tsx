import { Box, Button, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { CenteredFlexBox, FlexContainer } from "./styles";

const ConnectWalletPage = ({
    loadingSign,
    fetchingLogin,
    connectingWallet,
    account,
    handleLogin,
    rememberLogin,
    setRememberLogin,
}) => {
    const router = useRouter();
    return (
        <>
            <CenteredFlexBox flex={1} width="100%" height={"80vh"} data-cy="Sign In Modal">
                <CenteredFlexBox
                    flexDirection="column"
                    gap={"32px"}
                    border={`1px solid black`}
                    bgcolor={"white"}
                    height={"300px"}
                    p="72px 48px 48px 48px"
                    borderRadius="8px"
                    overflow={"hidden"}
                >
                    <FlexContainer>
                        {/* Box2 */}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ minWidth: "376px" }}
                            onClick={handleLogin}
                            disabled={
                                connectingWallet ||
                                fetchingLogin ||
                                loadingSign ||
                                (!!account && router.pathname.endsWith("/"))
                            }
                            key={"sign_in_button"}
                            data-cy="Sign In"
                        >
                            Sign In With Ethereum
                        </Button>
                        <Box display={"flex"} gap={"4px"} alignItems={"center"}>
                            <Checkbox
                                disabled={
                                    connectingWallet ||
                                    fetchingLogin ||
                                    loadingSign ||
                                    (!!account && router.pathname.endsWith("/"))
                                }
                                checked={rememberLogin}
                                onChange={e => setRememberLogin(e.target.checked)}
                                key={"remember_device"}
                            />
                            Remember this device for 30 days
                        </Box>
                        {connectingWallet && (
                            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                                <span style={{ marginLeft: "10px" }}>
                                    Please authenticate from your wallet
                                </span>
                            </Box>
                        )}
                        {!!account && router.pathname.endsWith("/") && (
                            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                                <span style={{ marginLeft: "10px" }}>Logging you in</span>
                            </Box>
                        )}
                    </FlexContainer>
                </CenteredFlexBox>
            </CenteredFlexBox>
        </>
    );
};

export default ConnectWalletPage;
