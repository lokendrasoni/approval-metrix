import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GoogleAuth from "src/components/GoogleAuth";
import Sidebar from "src/components/Sidebar";
import AddContacts from "src/components/addContacts";
import AddGoogleContacts from "src/components/addGoogleContacts";
import SafeContext from "src/contexts/SafeContext";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import { SET_SAFE_CONTRIBUTORS_ENDPOINT } from "src/queries/constants";
import { useGetSafeContributors } from "src/queries/safes/api";
import { MainContent, StyledContainer } from "./style";

export default function Contributors() {
    const router = useRouter();
    const { status, authCode } = router.query;
    const [googleContacts, setGoogleContacts] = useState([]);
    const [showGoogleModal, setShowGoogleModal] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showAddContactsModal, setShowAddContactsModal] = useState(false);
    const [fields, setFields] = useState([{ name: "", email: "" }]);

    const { safeAddress, safeAuthSignInResponse } = useContext(SafeContext) as SafeContextTypes;

    const { data, refetch } = useGetSafeContributors({
        "x-par-safe-address": safeAddress,
        "x-par-network-id": 5,
        "x-par-wallet-address": safeAuthSignInResponse?.eoa,
    });

    async function getPeople() {
        const options = {
            method: "POST",
            body: JSON.stringify({
                authCode: authCode,
            }),
        };
        const peopleData = await fetch("/api/google/google_auth_success", options).then(obj =>
            obj.json(),
        );
        if (peopleData.status === "success") {
            const peopleWithEmail = peopleData.data?.connections.filter(
                person => person.emailAddresses && person.emailAddresses[0],
            );
            setGoogleContacts(peopleWithEmail);
            setSelectedContacts([]);
            setShowGoogleModal(true);
        }
    }

    async function setContributorSafes(contributors) {
        const result = await fetch(`${SET_SAFE_CONTRIBUTORS_ENDPOINT}`, {
            method: "POST",
            headers: {
                credentials: "include",
                "content-type": "application/json",
                "x-par-safe-address": safeAddress,
                "x-par-network-id": "5",
                "x-par-wallet-address": safeAuthSignInResponse?.eoa,
            },
            body: JSON.stringify({ contributors }),
        });
        return (result as any)?.data;
    }

    useEffect(() => {
        if (status === "success") {
            getPeople();
        }
    }, [authCode, status]);

    useEffect(() => {
        console.log(selectedContacts);
    }, [selectedContacts]);

    const addContacts = async () => {
        console.log(fields);
        const resultData = setContributorSafes(fields);
        console.log(resultData);
        setShowAddContactsModal(false);
        setFields([{ name: "", email: "" }]);
        refetch();
    };
    const addGoogleContacts = async () => {
        console.log(selectedContacts);
        const resultData = setContributorSafes(selectedContacts);
        console.log(resultData);
        setShowAddContactsModal(false);
        setSelectedContacts;
        refetch();
    };

    const handleChange = (idx, event, type) => {
        const values = [...fields];
        console.log(values);
        console.log(event.target.value);
        if (event.target.value !== "") {
            values[idx][type] = event.target.value;
        }
        setFields(values);
    };

    const handleAdd = () => {
        const values = [...fields];
        values.push({ name: "", email: "" });
        setFields(values);
    };

    return (
        <StyledContainer>
            <Head>
                <title>Contributors</title>
            </Head>
            <Sidebar />
            <MainContent>
                <Grid container>
                    <Grid item xs={8}>
                        <h1 style={{ marginTop: "0", marginBottom: "10px" }}>Contributors</h1>
                        <p style={{ marginTop: "0" }}>
                            Add contributors to your DAO by importing them from your Google
                            Contacts.
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <GoogleAuth />
                        <Button
                            variant="contained"
                            sx={{ marginTop: "10px" }}
                            onClick={() => setShowAddContactsModal(true)}
                        >
                            Add Contacts
                        </Button>
                    </Grid>
                </Grid>
                <hr style={{ marginTop: "0", marginBottom: "20px" }} />
                {data && data?.contributors?.length > 0 ? (
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.contributors?.map((row: any) => {
                                return (
                                    <TableRow
                                        key={row.email}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>
                                            {row.walletAddress ? row.walletAddress : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No contributors added yet.</p>
                )}

                <AddContacts
                    showAddContactsModal={showAddContactsModal}
                    setShowAddContactsModal={setShowAddContactsModal}
                    fields={fields}
                    handleChange={handleChange}
                    handleAdd={handleAdd}
                    addContacts={addContacts}
                />

                <AddGoogleContacts
                    showGoogleModal={showGoogleModal}
                    setShowGoogleModal={setShowGoogleModal}
                    googleContacts={googleContacts}
                    setSelectedContacts={setSelectedContacts}
                    selectedContacts={selectedContacts}
                    addGoogleContacts={addGoogleContacts}
                />
            </MainContent>
        </StyledContainer>
    );
}
