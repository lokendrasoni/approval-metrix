// import { ISafeSchema } from "utils/types/SafeModel";
// import { NextApiRequest, NextApiResponse } from "next";
// import mongoose from "mongoose";
// import dbConnect from "utils/dbConnect";
// import isOwnerOfSafe from "middleware/isOwnerOfSafe";
// import Safe from "models/Safe";
// import Wallet from "models/Wallet";
// import { IWalletSchema } from "utils/types/WalletModel";
// import sendEmail from "utils/sendEmail";
// import Transaction from "models/Transaction";
// import { v4 } from "uuid";

// interface NextRequest extends NextApiRequest {
//     safeAddress: string;
//     safe: ISafeSchema;
//     networkId?: number;
//     operatorName?: string;
//     walletAddress?: string;
// }

// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// export function generateRandomString(length) {
//     let result = "";
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result;
// }

// const initialMessage = `Hey! We are so excited to work with you. This is an invitation to your payroll details page.`;

// const handler = async function (req: NextRequest, res: NextApiResponse) {
//     const { method } = req;
//     const session = await mongoose.startSession();
//     try {
//         /* istanbul ignore next */
//         // ignoring this because it would not run unless DB string is invalid (this case would be handled in middlewares)
//         const connection = await dbConnect();
//         /* istanbul ignore next */
//         if (!connection) {
//             throw new Error("db connection failed");
//         }
//         if (method != "POST") {
//             throw new Error("Only POST requests allowed!");
//         }
//         const { payouts, gnosisNonce = undefined, safeTransactionHash } = req.body;

//         if (!payouts || payouts?.length == 0 || gnosisNonce == undefined || !safeTransactionHash) {
//             throw new Error("Bad Request Body");
//         }

//         let safe: ISafeSchema;

//         const findSafe = await Safe.findOne({
//             safeAddress: req?.safeAddress,
//             networkId: req?.networkId,
//         });

//         if (!findSafe) {
//             return res.status(400)?.json({ success: false, message: "no safe imported" });
//         }

//         let contributorsToAdd = [];

//         // transaction created
//         const createdTransaction = await Transaction.create({
//             safeTransactionHash,
//             gnosisNonce,
//             networkId: req?.networkId,
//             safeAddress: req?.safeAddress,
//         });

//         // payouts

//         const payoutsCalc = payouts.map(payout => {
//             return {
//                 safeTransactionHash,
//                 amount: payout?.amount,
//                 decimals: payout?.decimals,
//                 recipientName: payout?.recipientName,
//                 to: payout?.to,
//                 tokenAddress: payout?.tokenAddress,
//                 tokenName: payout?.tokenName,
//                 tokenSymbol: payout?.tokenSymbol,
//                 tokenLogoUrl: payout?.tokenLogoUrl,
//                 transaction: createdTransaction?._id,
//                 networkId: req?.networkId,
//                 uniqueId: v4(),
//             };
//         });

//         return res.status(200).json({ success: true });
//     } catch (err) {
//         console.log("Error", err);
//         return res.status(500).json({ success: false, errorMessage: err.message });
//     } finally {
//         session.endSession();
//     }
// };

// export default isOwnerOfSafe(handler);
