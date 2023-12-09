import { Box } from "@mui/material";
import { useContext } from "react";
import ContributorContext from "src/contexts/ContributorContext";
import { ContributorContextTypes } from "src/contexts/types/ContributorContextTypes";

import Typography from "@mui/material/Typography";
import { theme } from "src/constants/colors";
import { CustomButton } from "src/modules/styles";

export default function ContributorLogin() {
    const { handleLogin } = useContext(ContributorContext) as ContributorContextTypes;

    return (
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
                    Hey,
                    <br />
                    Contributor
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
                    variant="outlined"
                    onClick={handleLogin}
                    sx={{
                        width: "50%",
                    }}
                >
                    {" "}
                    Sign in as contributor
                </CustomButton>
            </Box>
        </Box>
    );
}
