import mongoose from "mongoose";
import { IWalletSchema } from "./WalletModel";
// Interface to define our Safe model on the frontend

export interface ISafeSchema extends mongoose.Document {
    _id?: mongoose.Types.ObjectId;
    safeAddress: string;
    safeName: string;
    networkId: number;
    contributors: Array<{
        wallet: IWalletSchema;
        name: string;
        inviteCode: string;
        status: string;
    }>;
}
