import { Box, Button, Checkbox, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    BackArrow1Icon,
} from "src/CustomIcons";
import StampAvatar from "src/components/StampAvatar";
import { minifyAddress } from "src/helpers/utils/web3Utils";
import { CenteredFlexBox, FlexContainer, SlideBox } from "./styles";

const ConnectWalletPage = ({
    showContinue,
    handleContinueLogin,
    authData,
    nameText,
    lastLoggedInWalletName,
    continueLoading,
    loadingSign,
    fetchingLogin,
    connectingWallet,
    account,
    handleLogin,
    rememberLogin,
    setRememberLogin,
}) => {
    const [toggleContinue, setToggleContinue] = useState(true);
    const router = useRouter();
    return (
        <>
        <CenteredFlexBox flex={1} width="100%" height={"100%"} data-cy="Sign In Modal">
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
                {/* <StyledTypography textAlign="center" type="h3">
                    Crypto payroll that you actually love
                </StyledTypography> */}
                <FlexContainer showContinue={showContinue}>
                    {/* Box1 */}
                    {showContinue && (
                        <SlideBox toggleContinue={toggleContinue} key={"continue"}>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                gap="16px"
                                width={"100%"}
                            >
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    gap="12px"
                                    width={"100%"}
                                    minWidth="376px"
                                    border="1px solid #EAECF0"
                                    p="12px"
                                    borderRadius={"8px"}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "12px",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "12px",
                                            }}
                                        >
                                            <StampAvatar
                                                seed={authData?.walletAddress}
                                                size={36}
                                                containerStyles={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            />
                                            <Box
                                                display={"flex"}
                                                flexDirection={"column"}
                                                justifyContent={"center"}
                                            >
                                                <Typography variant="body1">
                                                    {nameText}
                                                </Typography>
                                                {lastLoggedInWalletName ? (
                                                    <Typography
                                                        variant="body2"
                                                        color="secondary"
                                                    >
                                                        {minifyAddress(authData?.walletAddress)}
                                                    </Typography>
                                                ) : null}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button
                                        disabled={continueLoading}
                                        fullWidth
                                        onClick={handleContinueLogin}
                                    >
                                        <CenteredFlexBox gap="4px">
                                            {continueLoading ? "Logging you in..." : "Continue"}
                                            {continueLoading ? (
                                                <CircularProgress
                                                    size={"16px"}
                                                    sx={{
                                                        color: "white",
                                                    }}
                                                />
                                            ) : null}
                                        </CenteredFlexBox>
                                    </Button>
                                </Box>
                                <Button
                                    disabled={continueLoading}
                                    onClick={() => setToggleContinue(false)}
                                    sx={{
                                        marginTop: "15px",
                                        marginX: "auto",
                                        marginBottom: "15px",
                                    }}
                                >
                                    Continue with a different wallet
                                </Button>
                            </Box>
                        </SlideBox>
                    )}
                    {/* Box2 */}
                    <SlideBox toggleContinue={toggleContinue} key={"sign_in"}>
                        <Button
                            fullWidth
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
                        Remember this device for 30 days</Box>
                        {connectingWallet && (
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"center"}
                                margin={"30px 0 0 0"}
                            >
                                <span style={{ marginLeft: "10px" }}>
                                    Please authenticate from your wallet
                                </span>
                            </Box>
                        )}
                        {!!account && router.pathname.endsWith("/") && (
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"center"}
                                margin={"30px 0 0 0"}
                            >
                                <span style={{ marginLeft: "10px" }}>Logging you in</span>
                            </Box>
                        )}
                        {showContinue && (
                            <Button
                                type={"button"}
                                startIcon={<BackArrow1Icon />}
                                onClick={() => setToggleContinue(true)}
                                sx={{ marginTop: "55px" }}
                            >
                                Back
                            </Button>
                        )}
                    </SlideBox>
                </FlexContainer>
            </CenteredFlexBox>
        </CenteredFlexBox></>
    );
};

export default ConnectWalletPage;
