import mongoose from "mongoose";
export interface IWalletSchema extends mongoose.Document {
    address: string;
    name: string;
    email: string;
    contributedSafes: Array<mongoose.Types.ObjectId>;
    findOneOrCreate: Function;
}

export interface IWalletWithMetaSchema extends mongoose.Document {
    wallet: IWalletSchema;
}
