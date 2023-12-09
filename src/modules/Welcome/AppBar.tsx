import { Box, Button, Card, Typography, styled } from "@mui/material";
import { SafeAuthUserInfo } from "@safe-global/auth-kit";
import { useRouter } from "next/router";

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
    console.log(userInfo.name, "userInfo");
    const router = useRouter();
    return (
        <>
            {!isLoggedIn && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "120px",
                        justifyContent: "center",
                    }}
                >
                    <LoginForm>
                        <Box
                            mr={5}
                            width={"100%"}
                            height={"50%"}
                            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <Typography variant="h4" pl={4} fontWeight={600} textAlign={"center"}>
                                gm folks!
                            </Typography>
                        </Box>

                        <Box
                            mr={5}
                            width={"100%"}
                            height={"50%"}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button variant="contained" onClick={onLogin} sx={{ width: "40%" }}>
                                Login as DAO
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: "40%" }}
                                onClick={() => router.push("/contributor")}
                            >
                                Login as Contributor
                            </Button>
                        </Box>
                    </LoginForm>
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
                                <Typography variant="body1" fontWeight={700}>
                                    Hello {userInfo.name || userInfo.email} (
                                    {minifyAddress(eoa, 4, 4)})
                                </Typography>
                            </>
                        )}
                        <Button variant="contained" onClick={onLogout} sx={{ ml: 2 }}>
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
