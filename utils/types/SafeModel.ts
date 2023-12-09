import mongoose from "mongoose";
// Interface to define our Safe model on the frontend

export interface ISafeSchema extends mongoose.Document {
    _id?: mongoose.Types.ObjectId;
    safeAddress: string;
    safeName: string;
    networkId: number;
    contributors: Array<{
        wallet: mongoose.Types.ObjectId;
        name: string;
        inviteCode: string;
        status: string;
    }>;
}
