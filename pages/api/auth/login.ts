import cookie from "cookie";
import { ethers, getAddress } from "ethers";
import jwt from "jsonwebtoken";
import Wallet from "models/Wallet";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import dbConnect from "utils/dbConnect";
import { verifyArgent } from "utils/onboard/login";
import { IWalletSchema } from "utils/types/WalletModel";
interface NextResponse extends NextApiResponse {
    // eslint-disable-next-line unused-imports/no-unused-vars
    cookie(name: string, value: string, options?: cookie.CookieSerializeOptions): void;
}

const login = async (req: NextApiRequest, res: NextResponse) => {
    const { method } = req;
    const connection = await dbConnect();
    if (!connection) {
        throw new Error("db connection failed");
    }

    if (method !== "POST") {
        res.status(400).json({ success: false, message: "Only POST requests allowed!" });
    }

    const {
        walletAddress,
        networkId,
        signedMessage,
        message,
        isArgent = false,
        rememberLogin,
    } = req.body;

    if (!walletAddress || !signedMessage || !networkId) {
        return res
            .status(400)
            .json({ success: false, message: "Insufficient parameters provided!" });
    }

    const AUTH_MSG: string = process.env.AUTH_MSG || ""; // auth_msg signed in case of Argent
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const AUTH_COOKIE_NAME: string = process.env.AUTH_COOKIE_NAME || "parcelv3AuthCookie";

    // validate the message signed by the wallet and throw error if invalid
    if (isArgent) {
        const hashMessage = ethers.hashMessage(AUTH_MSG);
        if (!(await verifyArgent(walletAddress, signedMessage, hashMessage))) {
            return res.status(400).json({
                log: `Signature doesn't match with Wallet Address`,
                success: false,
            });
        }
    } else {
        try {
            // Convet message signed by the user to SiweMessage format to validate further
            const siweMessage = new SiweMessage(message);
            // extract fields to validate signature
            const fields = await siweMessage.validate(signedMessage);
            // Compare the recovered address with the address from request
            if (getAddress(fields.address) !== getAddress(walletAddress)) {
                return res.status(400).json({
                    log: `Signature doesn't match with Wallet Address`,
                    success: false,
                });
            }
        } catch (error: any) {
            return res.status(400).json({
                log: `Error in logging!`,
                error: error.message,
                success: false,
            });
        }
    }

    // if validation doesn't fail, check if wallet exists in the DB - create if doesn't
    let wallet: IWalletSchema = await (Wallet as any).findOneOrCreate(walletAddress);

    // if (wallet.recievingAddresses?.length < 1) {
    //     wallet.recievingAddresses.push({
    //         address: walletAddress,
    //         receiveOn: "address",
    //         ens: "",
    //         isDefault: true,
    //         isPermanentAddress: true,
    //         name: "My Account",
    //     });
    //     await wallet.save();
    // }

    // Sign JWT
    const access_token = jwt.sign(
        {
            walletAddress,
            networkId,
        },
        JWT_SECRET,
        { expiresIn: rememberLogin ? "30d" : "24h" }, // cookie expires in 30 days if opted for remember login, else expires in 1 day
    );

    // if happy flow - set cookie and return success message along with wallet obj
    res.setHeader(
        "Set-Cookie",
        cookie.serialize(AUTH_COOKIE_NAME, access_token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60,
            safeSite: "strict",
            path: "/",
        }),
    )
        .status(200)
        .send({ success: true, message: "Logged in successfully!", wallet });
};

export default login;
