import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL,
        );

        const authCode = JSON.parse(req.body).authCode;
        if (authCode) {
            const { tokens } = await oauth2Client.getToken(authCode);
            oauth2Client.setCredentials(tokens);

            const people = google.people({ version: "v1", auth: oauth2Client });
            const { data } = await people.people.connections.list({
                resourceName: "people/me",
                personFields: "names,emailAddresses",
            });

            res.send({ status: "success", data: data });
        } else {
            res.send({ status: "failed" });
        }
    } catch (error) {
        console.error("Error fetching Google Users:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
export default handler;
