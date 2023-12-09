import mongoose from "mongoose";

export interface ITransactionPayoutSchema extends mongoose.Document {
    amount: number;
    tokenAddress: string;
    tokenValue: number;
    fiatValue: number;
    fiatCurrency: string;
    address: string;
    payoutType: string;
    description: string;
    category: string;
    transactionHash: string;
    transaction: string;
}
