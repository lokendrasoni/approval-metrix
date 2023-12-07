import { getAddress } from "ethers/lib/utils";
import jwt from "jsonwebtoken";
import dbConnect from "utils/dbConnect";
const authenticate = handler => {
    return async (req, res) => {
        let token;
        const AUTH_COOKIE_NAME: string = process.env.AUTH_COOKIE_NAME || "parcelv3AuthCookie";

        if (req?.cookies && req?.cookies[AUTH_COOKIE_NAME]) {
            token = req.cookies[AUTH_COOKIE_NAME];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in to get access!",
            });
        }

        try {
            const connection = await dbConnect();
            if (!connection) {
                throw new Error("db connection failed");
            }
            const JWT_SECRET = process.env.JWT_SECRET || "";
            const decoded = jwt.verify(token, JWT_SECRET);

            let isTokenExpired = decoded.exp * 1000 < Date.now();
            if (isTokenExpired) {
                res.status(400).json({
                    success: false,
                    message: "Cookie expired. Login again to get access.",
                });
            }

            req.walletAddress = getAddress(decoded.walletAddress);
            // req.networkId = decoded.networkId;
            // networkId will not be extracted from signature, it'll be always passed in the header.

            const networkId: number | null = req.headers["x-par-network-id"];

            if (!!networkId) {
                req.networkId = networkId;
            }

            const safeAddress: string | null = req.headers["x-par-safe"] || null;

            if (safeAddress) {
                req.safeAddress = safeAddress;
            }

            return handler(req, res);
        } catch (error) {
            console.log("Auth Error", { error });

            return res
                .status(401)
                .json({ success: false, message: "Please log in to get access!" });
        }
    };
};

export default authenticate;
