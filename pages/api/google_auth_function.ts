import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Load the credentials file downloaded from the Google Cloud Console
        const credentials = require("../../pages/google-auth/google_auth.json");

        // Scopes required for People API
        const scopes = ["https://www.googleapis.com/auth/contacts.readonly"];

        const oAuth2Client = new google.auth.OAuth2(
            credentials.web.client_id,
            credentials.web.client_secret,
            credentials.web.redirect_uris[0],
        );

        const url = oAuth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: "offline",
            // If you only need one scope you can pass it as a string
            scope: scopes,
        });

        console.log(oAuth2Client);
        const people = google.people({ version: "v1", auth: url });
        const response = await people.people.connections.list({
            resourceName: "people/me", // 'people/me' represents the authenticated user
            personFields: "names,emailAddresses", // Customize the fields as needed
        });
        console.log(people);
        const contacts = response.data.connections;
        console.log("Google Contacts:", contacts);
    } catch (error) {
        console.error("Error fetching Google Users:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
export default handler;
