import { Box, Button } from "@mui/material";
import { useContext } from "react";
import ContributorContext from "src/contexts/ContributorContext";
import { ContributorContextTypes } from "src/contexts/types/ContributorContextTypes";

export default function ContributorLogin() {
    const { handleLogin } = useContext(ContributorContext) as ContributorContextTypes;

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
            width={"100%"}
        >
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Sign In with Contributor
            </Button>
        </Box>
    );
}
