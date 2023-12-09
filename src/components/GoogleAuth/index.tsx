import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { theme } from "src/constants/colors";

const GoogleAuth = () => {
    const router = useRouter();
    const [authUrl, setAuthUrl] = useState("");

    const fetchContacts = async () => {
        try {
            const authUrlLocal = await fetch("/api/google/google_auth_function").then(obj =>
                obj.json(),
            );
            setAuthUrl(authUrlLocal.url);
        } catch (error) {
            console.error("Error fetching contacts:", error.message);
        }
    };

    useEffect(() => {
        if (authUrl && router) {
            router.push(authUrl);
            setAuthUrl(null);
        }
    }, [router, authUrl]);

    return (
        <Button
            variant="contained"
            sx={{ backgroundColor: theme.grey[900] }}
            onClick={fetchContacts}
        >
            Import Google Contacts
        </Button>
    );
};

export default GoogleAuth;
