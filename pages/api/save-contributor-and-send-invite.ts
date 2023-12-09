import { ISafeSchema } from "utils/types/SafeModel";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "utils/dbConnect";
import isOwnerOfSafe from "middleware/isOwnerOfSafe";
import Safe from "models/Safe";
import Wallet from "models/Wallet";
import { IWalletSchema } from "utils/types/WalletModel";

interface NextRequest extends NextApiRequest {
    safe: ISafeSchema;
    networkId?: number;
    operatorName?: string;
    walletAddress?: string;
}

const initialMessage = `Hey! We are so excited to work with you. This is an invitation to your payroll details page.`;

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
        if (method != "POST") {
            throw new Error("Only POST requests allowed!");
        }
        const { safeAddress, networkId, contributors, host } = req.body;

        if (!networkId || !safeAddress || !contributors || contributors?.length == 0) {
            throw new Error("Bad Request Body");
        }

        let safe: ISafeSchema;

        const findSafe = await Safe.findOne({
            safeAddress: safeAddress,
            networkId: networkId,
        });

        if (findSafe) {
            safe = findSafe;
        } else {
            safe = await Safe.create({
                safeAddress: safeAddress,
                networkId,
            });
        }

        for (let contributor of contributors) {
            let wallet: IWalletSchema;

            const foundWallet = await Wallet.findOne({ email: contributor?.email });

            if (foundWallet) {
                wallet = foundWallet;
            } else {
                wallet = await Wallet.create({
                    email: contributor?.email,
                });
            }

            const existingContributedSafes = wallet?.contributedSafes || [];
            const newContributedSafes = [...existingContributedSafes, safe?._id];

            wallet.contributedSafes = newContributedSafes;
            await wallet.save();

            const data = {
                to: contributor?.email?.trim()?.toLowerCase(),
                subject: `Safe is inviting you to their payroll 🎉`,
                template: "invite-hackathon-23",
                "h:X-Mailgun-Variables": JSON.stringify({
                    link: `${host}/contributor?inviteCode=${inviteCode}`,
                    titleText: `Safe is inviting you to their payroll 🎉`,
                    bodyText: initialMessage,
                    showQuote: true, // Boolean
                    safeName: req?.safe?.safeName,
                    buttonText: "View Invitation",
                }),
            };

            sendEmail(data, async function (error: any, body: any) {
                console.log("body email", body);
                if (error) {
                    console.log("error email", error);
                    res.status(400).send({
                        success: false,
                        message: "unable to send email",
                    });
                }
            });
        }
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ success: false, errorMessage: err.message });
    } finally {
        session.endSession();
    }
};

export default isOwnerOfSafe(handler);
