import { ISafeSchema } from "utils/types/SafeModel";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "utils/dbConnect";
import isOwnerOfSafe from "middleware/isOwnerOfSafe";
import Safe from "models/Safe";
import Wallet from "models/Wallet";
import { IWalletSchema } from "utils/types/WalletModel";
import sendEmail from "utils/sendEmail";

interface NextRequest extends NextApiRequest {
    safeAddress: string;
    safe: ISafeSchema;
    networkId?: number;
    operatorName?: string;
    walletAddress?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function generateRandomString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
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
        const { contributors } = req.body;

        if (!contributors || contributors?.length == 0) {
            throw new Error("Bad Request Body");
        }

        let safe: ISafeSchema;

        const findSafe = await Safe.findOne({
            safeAddress: req?.safeAddress,
            networkId: req?.networkId,
        });

        if (findSafe) {
            safe = findSafe;
        } else {
            safe = await Safe.create({
                safeAddress: req?.safeAddress,
                networkId: req?.networkId,
            });
        }

        let contributorsToAdd = [];

        //contributor to safe relation
        for (let contributor of contributors) {
            const inviteCode = generateRandomString(6);
            let wallet: IWalletSchema;

            const foundWallet = await Wallet.findOne({ email: contributor?.email });

            if (foundWallet) {
                wallet = foundWallet;
            } else {
                wallet = await Wallet.create({
                    email: contributor?.email,
                });
            }

            await Wallet.findOneAndUpdate(
                {
                    _id: wallet?._id,
                },
                { $addToSet: { contributedSafes: safe?._id } },
            );

            contributorsToAdd.push({
                wallet: wallet?._id,
                name: contributor?.name,
                inviteCode,
                status: "pending",
            });

            const data = {
                to: contributor?.email?.trim()?.toLowerCase(),
                subject: `${req?.safeAddress} is inviting you to their contributors 🎉`,
                template: "invite-hackathon-23",
                "h:X-Mailgun-Variables": JSON.stringify({
                    link: `${req.headers.host}/contributor`,
                    titleText: `${req?.safeAddress} is inviting you to their contributors 🎉`,
                    bodyText: initialMessage,
                    showQuote: false, // Boolean
                    safeName: safe?.safeAddress,
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

        // safe to wallets

        const existingContributors = safe?.contributors || [];

        const contributorsToAddCalc = [...existingContributors, ...contributorsToAdd];

        const uniqueContributorsToAdd = contributorsToAddCalc.filter(objToAdd => {
            return !existingContributors.some(existingObj => {
                return existingObj.wallet?.toString() == objToAdd.wallet?.toString();
            });
        });

        safe.contributors = [...uniqueContributorsToAdd];
        await safe.save();
        return res.status(201).json({ success: true });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ success: false, errorMessage: err.message });
    } finally {
        session.endSession();
    }
};

export default isOwnerOfSafe(handler);
