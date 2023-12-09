import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useContext } from "react";
import ContributorContext from "src/contexts/ContributorContext";
import { ContributorContextTypes } from "src/contexts/types/ContributorContextTypes";
import { useGetContributorSafes } from "src/queries/contributor/api";

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

export default function ContributorHome() {
    const { data, isSuccess } = useGetContributorSafes();
    const { wallet, logout, web3auth } = useContext(ContributorContext) as ContributorContextTypes;

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
                    <Typography variant="h3" pl={4} fontWeight={700}>
                        Auth Provider Demo
                    </Typography>
                </Box>
            </Box>
            <Typography
                variant="body1"
                fontWeight={700}
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                marginRight={"20px"}
            >
                Hello ({minifyAddress(wallet, 4, 4)})
                <Button variant="contained" onClick={logout} sx={{ ml: 2 }}>
                    Log Out
                </Button>
            </Typography>

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
                        minWidth: 950,
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
                                Your Safes
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.safes.map(i => {
                            return (
                                <TableRow
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
                                            fontSize: "22px",
                                        }}
                                    >
                                        Safe Address:{i?.safeAddress}
                                        <Button variant="contained" sx={{ ml: "25px" }}>
                                            View Payments
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
