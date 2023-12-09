import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SafeContext from "src/contexts/SafeContext";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import { useGetSafeContributors } from "src/queries/safes/api";

export default function QuickSend() {
    const { safeAddress, safeAuthSignInResponse } = useContext(SafeContext) as SafeContextTypes;
    const [selectedContributor, setSelectedContributor] = useState("");
    const [amount, setAmount] = useState("");
    const [token, setToken] = useState("gETH");
    const { data, isSuccess } = useGetSafeContributors({
        "x-par-safe-address": safeAddress,
        "x-par-network-id": 5,
        "x-par-wallet-address": safeAuthSignInResponse?.eoa,
    });

    return (
        <>
            {!isSuccess ? (
                <>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            gap={"8px"}
                        >
                            <Select
                                value={selectedContributor}
                                onChange={e => setSelectedContributor(e.target.value)}
                            >
                                <MenuItem value={""}>Select a contributor</MenuItem>
                            </Select>
                            {/* <TokenInput
                                label="Amount"
                                amount={amount}
                                handleAmountChange={(e, v) => setAmount(v)}
                                tokensInSafe={}
                                token={token}
                                handleTokenChange={(e, v) => {
                                    setToken(v);
                                }}
                                options={}
                            /> */}
                        </Box>
                    </Box>
                </>
            ) : (
                <Typography variant="h6">Please add contributors to send payments</Typography>
            )}
        </>
    );
}
