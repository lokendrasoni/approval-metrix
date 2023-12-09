import mongoose from "mongoose";
import { ITransactionSchema } from "utils/types/TransactionModel";
require("./Transaction");

const TransactionPayoutSchema = new mongoose.Schema(
    {
        safeTransactionHash: {
            type: String,
            required: true,
            // transactionId field will be dynamic based on txType   .
            // for module transaction -  module_transaction_id
            // for Multisig Transaction - safeTransactionHash
            // for Incoming Transaction - transactionHas
        },
        transactionType: {
            required: true,
            type: String,
            default: "MULTISIG_TRANSACTION",
        },
        amount: {
            type: String, // in wei
        },
        decimals: {
            type: Number,
        },
        fiatCurrency: {
            type: String,
            default: "usd",
        },
        recipientName: {
            type: String,
        },
        to: {
            type: String, // address which is paid,
        },
        tokenAddress: {
            type: String,
        },
        tokenName: {
            type: String,
        },
        tokenSymbol: {
            type: String,
        },
        tokenLogoUrl: {
            type: String,
        },
        transaction: {
            type: mongoose.Types.ObjectId,
            ref: "Transaction",
        },
        networkId: {
            type: Number,
        },
        uniqueId: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default (mongoose.models.TransactionPayout as mongoose.Model<ITransactionSchema>) ||
    mongoose.model<ITransactionSchema>("TransactionPayout", TransactionPayoutSchema);
