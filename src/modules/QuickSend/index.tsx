import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import TokenInput from "src/components/TokenInput";
import TokenLogo from "src/components/TokenLogo";
import SafeContext from "src/contexts/SafeContext";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import { stringNumberToWei, weiToString } from "src/helpers/utils/bignumberUtils";
import { minifyAddress } from "src/helpers/utils/web3Utils";
import useMultisigTransaction from "src/hooks/useMultisigTransaction";
import { useGetSafeContributors } from "src/queries/safes/api";

export default function QuickSend() {
    const { safeAddress, safeAuthSignInResponse, tokensInSafe } = useContext(
        SafeContext,
    ) as SafeContextTypes;
    const [selectedContributor, setSelectedContributor] = useState("");
    const [amount, setAmount] = useState("");
    const [token, setToken] = useState("gETH");
    const { data, isSuccess, isLoading } = useGetSafeContributors({
        "x-par-safe-address": safeAddress,
        "x-par-network-id": 5,
        "x-par-wallet-address": safeAuthSignInResponse?.eoa,
    });

    const [payments, setPayments] = useState([]);

    const { loading, handleAddConfirmation, createMultisigTransaction } = useMultisigTransaction(
        safeAddress,
        5,
    );

    const handleSave = async () => {
        console.log("payments", payments);
        const payouts = payments?.map(payment => {
            return {
                to: payment?.to,
                tokenAddress: payment?.tokenAddress,
                amount: payment?.amount,
                decimals: payment?.token?.decimals,
                inWei: true,
            };
        });
        const { safeTransaction, safeTransactionHash } = await createMultisigTransaction({
            payouts,
        });

        console.log({ safeTransaction, safeTransactionHash });
        await handleAddConfirmation(safeTransaction, safeTransactionHash);
        alert(`Transaction created Nonce ${safeTransaction?.data?.nonce}`);
        setPayments([]);
    };

    const handleAdd = () => {
        if (!selectedContributor || !token || !amount) {
            window.alert("Please fill all the info");
            return;
        }
        setPayments(v => {
            v.push({
                to: data?.contributors?.find(d => d.walletAddress === selectedContributor)
                    ?.walletAddress,
                name:
                    data?.contributors?.find(d => d.walletAddress === selectedContributor)?.name ||
                    data?.contributors?.find(d => d.walletAddress === selectedContributor)?.email,
                amount: stringNumberToWei(amount, tokensInSafe[token]?.decimals),
                token: tokensInSafe[token],
            });
            return v;
        });
        setAmount("");
        setSelectedContributor("");
        setToken("");
    };

    return (
        <>
            {isLoading ? (
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <CircularProgress />
                </Box>
            ) : isSuccess && data?.success ? (
                data?.contributors?.find(c => !!c.walletAddress) ? (
                    <>
                        <Box
                            display={"flex"}
                            sx={{
                                border: "1px solid #1a202c",
                                padding: "20px",
                                borderRadius: "10px",
                                gap: "20px",
                            }}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                gap={"8px"}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Select Contributor
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedContributor}
                                        label="Select Contributor"
                                        onChange={e => setSelectedContributor(e.target.value)}
                                    >
                                        {data?.contributors
                                            ?.filter(contributor => !!contributor?.walletAddress)
                                            ?.map((contributor, key) => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        value={contributor?.walletAddress || ""}
                                                    >
                                                        {contributor?.name ||
                                                            contributor?.email ||
                                                            contributor?.walletAddress}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                                <TokenInput
                                    label="Amount"
                                    amount={amount}
                                    handleAmountChange={(e, v) => setAmount(v)}
                                    tokensInSafe={tokensInSafe}
                                    token={token}
                                    handleTokenChange={(e, v) => {
                                        setToken(v);
                                    }}
                                    options={Object.keys(tokensInSafe).map(token => {
                                        return {
                                            name: token,
                                            symbol: tokensInSafe?.[token]?.symbol,
                                            logoUri: tokensInSafe?.[token]?.logoUri,
                                            decimals: tokensInSafe?.[token]?.decimals,
                                            tokenAddress: tokensInSafe?.[token]?.tokenAddress,
                                            fiatConversion: "0",
                                        };
                                    })}
                                />
                                <Box display={"flex"} gap={"10px"}>
                                    <Button
                                        variant="contained"
                                        onClick={handleAdd}
                                        disabled={!selectedContributor || !token || !amount}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                            setAmount("");
                                            setSelectedContributor("");
                                            setToken("");
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </Box>
                            </Box>
                            <Box display={"flex"} gap={"4px"} flexDirection={"column"}>
                                {payments?.map((payment, index) => {
                                    return (
                                        <Box
                                            display={"flex"}
                                            key={index}
                                            alignItems={"center"}
                                            gap={"20px"}
                                        >
                                            <Typography variant="h5">
                                                {payment?.name || payment?.to}(
                                                {minifyAddress(payment?.to)})
                                            </Typography>
                                            <TokenLogo
                                                imageUrl={payment?.token?.logoUri}
                                                size="20px"
                                                brokenLogo={payment?.token?.brokenLogo}
                                                wrapperStyle={{
                                                    " span": { verticalAlign: "baseline" },
                                                }}
                                            />
                                            <Typography>
                                                {weiToString(
                                                    payment?.amount,
                                                    payment?.token?.decimals,
                                                )}{" "}
                                                {payment?.token?.symbol}
                                            </Typography>
                                        </Box>
                                    );
                                })}

                                {payments?.length ? (
                                    <Box display={"flex"} gap={"10px"}>
                                        {loading ? (
                                            <CircularProgress size={"20px"} />
                                        ) : (
                                            <Button variant="contained" onClick={handleSave}>
                                                Create Transaction
                                            </Button>
                                        )}

                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                setPayments([]);
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6">No contributor with wallet address found</Typography>
                )
            ) : (
                <Typography variant="h6">Please add contributors to send payments</Typography>
            )}
        </>
    );
}
