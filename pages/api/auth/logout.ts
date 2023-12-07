import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
interface NextResponse extends NextApiResponse {
    cookie(name: string, value: string, options?: cookie.CookieSerializeOptions): void;
}

const handler = async (req: NextApiRequest, res: NextResponse) => {
    const { method } = req;

    if (method !== "POST") {
        res.status(400).json({ success: false, message: "Only POST requests allowed!" });
    }

    const AUTH_COOKIE_NAME: string = process.env.AUTH_COOKIE_NAME || "parcelv3AuthCookie";
    res.setHeader(
        "Set-Cookie",
        cookie.serialize(AUTH_COOKIE_NAME, "", {
            httpOnly: true,
            expires: new Date(0),
            safeSite: "strict",
            path: "/",
        }),
    )
        .status(200)
        .send({ success: true, message: "Logged out successfully!" });
};

export default handler;
