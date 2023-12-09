import mongoose from "mongoose";
import { ITransactionSchema } from "utils/types/TransactionModel";

const TransactionSchema = new mongoose.Schema(
    {
        safeTransactionHash: {
            type: String,
            required: true,
            index: true,
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

        payoutNonce: {
            type: Number,
        },
        gnosisNonce: {
            type: Number,
        },
        source: {
            type: String, // gnosis or buildoors
        },
        networkId: {
            type: Number,
        },
        safeAddress: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default (mongoose.models.Transaction as mongoose.Model<ITransactionSchema>) ||
    mongoose.model<ITransactionSchema>("Transaction", TransactionSchema);
