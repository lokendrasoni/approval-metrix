import mongoose from "mongoose";
export interface IWalletSchema extends mongoose.Document {
    address: string;
    name: string;
    email: string;
    ens: string;
    findOneOrCreate: Function;
}

export interface IWalletWithMetaSchema extends mongoose.Document {
    wallet: IWalletSchema;
}
