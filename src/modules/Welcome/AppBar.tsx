import { Box, Button, Card, Divider, Typography, styled } from "@mui/material";
import { SafeAuthUserInfo } from "@safe-global/auth-kit";
import { useRouter } from "next/router";
import { theme } from "src/constants/colors";
import { CustomButton } from "../styles";

type AppBarProps = {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    userInfo?: SafeAuthUserInfo;
    eoa?: string;
};

const minifyAddress = (address, middleChars = 6, endChars = 4) => {
    if (!address) return "";
    if (address.length < 20) return address;
    if (address.substr(-4) == ".eth") return address;
    return `${address.substring(0, middleChars + 2)}...${address.substring(
        address.length - endChars,
    )}`;
};

const replaceAddresswithMinification = (string, middleChars = 7, endChars = 4) => {
    if (!string) return "";

    return string.replaceAll(/0x[a-zA-Z0-9]{64}/g, match => {
        return minifyAddress(match, middleChars, endChars);
    });
};

const AppBar = ({ isLoggedIn, onLogin, onLogout, userInfo, eoa }: AppBarProps) => {
    const router = useRouter();
    const handleContributorLogin = () => {
        router.push("/contributor");
    };

    return (
        <>
            {!isLoggedIn && (
                <Box
                    sx={{
                        display: "flex",
                        width: "100vw",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            background: theme.grey[900],
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            padding: "20px",
                        }}
                    >
                        <Typography
                            variant="h4"
                            pl={4}
                            fontWeight={600}
                            sx={{
                                fontSize: "70px",
                                color: "white",
                            }}
                        >
                            Welcome
                            <br />
                            to
                            <br />
                            Buildoors
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            background: "white",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "20px",
                            gap: "20px",
                        }}
                    >
                        <CustomButton
                            variant="contained"
                            onClick={onLogin}
                            sx={{
                                background: theme.grey[900],
                                width: "50%",
                            }}
                        >
                            {" "}
                            Sign in as DAO
                        </CustomButton>
                        <Divider
                            flexItem
                            orientation="horizontal"
                            variant="middle"
                            sx={{ width: "50%", marginX: "auto" }}
                        />
                        <CustomButton
                            variant="outlined"
                            onClick={handleContributorLogin}
                            sx={{
                                width: "50%",
                            }}
                        >
                            {" "}
                            Sign in as contributor
                        </CustomButton>
                    </Box>
                </Box>
            )}
            {isLoggedIn && (
                <>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"flex-end"}
                        paddingRight={"25px"}
                        marginTop={"-50px"}
                    >
                        {userInfo && (
                            <>
                                <Typography
                                    variant="body1"
                                    fontWeight={700}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    alignItems={"center"}
                                    marginRight={"20px"}
                                    color={"white"}
                                >
                                    Hello {userInfo.name || userInfo.email} (
                                    {minifyAddress(eoa, 4, 4)})
                                </Typography>
                            </>
                        )}
                        <Button
                            variant="outlined"
                            onClick={onLogout}
                            sx={{ ml: 2, color: "white", border: "1px solid white" }}
                        >
                            Log Out
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

const LoginForm = styled(Card)`
    && {
        border: 1px solid grey;
        height: 25rem;
        width: 50%;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }
`;

export default AppBar;
