import mongoose from "mongoose";
import { IWalletSchema } from "utils/types/WalletModel";
require("./Safe");

const WalletSchema = new mongoose.Schema(
    {
        address: {
            type: String,
        },
        name: {
            type: String,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contributedSafes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Safe",
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Wallet =
    (mongoose.models.Wallet as mongoose.Model<IWalletSchema>) ||
    mongoose.model<IWalletSchema>("Wallet", WalletSchema);
export default Wallet;
