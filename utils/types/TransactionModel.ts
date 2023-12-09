import mongoose from "mongoose";

export interface ITransactionSchema extends mongoose.Document {
    transactionHash: string;
    safeTransactionHash: string;
    transactionFees: number;
    paymentType: string;
    nonce: number;
    status: string;
    category: string;
    description: string;
    createdBy: string;
    networkId: number;
    safe: string;
}
