import mongoose from "mongoose";
import { ISafeSchema } from "utils/types/SafeModel";
require("./Wallet");

// status =   enum: ["pending", "successful", "rejected", "failed"],
const SafeSchema = new mongoose.Schema(
    {
        safeAddress: {
            type: String,
            required: [true, "Please add safe address"],
            unique: false,
        },
        safeName: {
            type: String,
            required: false,
            unique: false,
        },
        networkId: {
            type: Number,
            required: [true, "Please add Networkid"],
            unique: false,
        },
        contributors: [
            {
                wallet: {
                    type: mongoose.Types.ObjectId,
                    ref: "Wallet",
                },
                name: {
                    type: String,
                },
                inviteCode: {
                    type: String,
                },
                status: {
                    type: String,
                },
            },
        ],
    },
    { collection: "safes", timestamps: true },
);

SafeSchema.index({ safeAddress: 1, networkId: 1 }, { unique: true });

const Safe =
    (mongoose.models.Safe as mongoose.Model<ISafeSchema>) ||
    mongoose.model<ISafeSchema>("Safe", SafeSchema);
export default Safe;
