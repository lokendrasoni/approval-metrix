import { ISafeSchema } from "utils/types/SafeModel";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "utils/dbConnect";
import isOwnerOfSafe from "middleware/isOwnerOfSafe";
import Safe from "models/Safe";

interface NextRequest extends NextApiRequest {
    safeAddress: string;
    safe: ISafeSchema;
    networkId?: number;
    operatorName?: string;
    walletAddress?: string;
}

const handler = async function (req: NextRequest, res: NextApiResponse) {
    const { method } = req;
    const session = await mongoose.startSession();
    try {
        /* istanbul ignore next */
        // ignoring this because it would not run unless DB string is invalid (this case would be handled in middlewares)
        const connection = await dbConnect();
        /* istanbul ignore next */
        if (!connection) {
            throw new Error("db connection failed");
        }
        if (method != "GET") {
            throw new Error("Only GET requests allowed!");
        }

        const findSafe = await Safe.findOne({
            safeAddress: req?.safeAddress,
            networkId: req?.networkId,
        })
            ?.populate("contributors.wallet")
            ?.lean();

        if (!findSafe) {
            return res.status(400)?.json({ success: false, message: "no safe imported" });
        }

        return res.status(200).json({
            success: true,
            contributors: findSafe?.contributors?.map(contributor => {
                return {
                    name: contributor?.name,
                    email: contributor?.wallet?.email,
                    walletAddress: contributor?.wallet?.address,
                    safeAddress: findSafe?.safeAddress,
                };
            }),
        });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ success: false, errorMessage: err.message });
    } finally {
        session.endSession();
    }
};

export default isOwnerOfSafe(handler);
