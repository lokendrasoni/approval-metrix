import mongoose from "mongoose";
import { IWalletSchema } from "utils/types/WalletModel";

const WalletSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: [true, "Please add wallet address"],
            unique: true,
        },
        name: {
            type: String,
            unique: false,
        },
        email: {
            type: String,
        },
        ens: {
            type: String,
            required: false,
            unique: false,
        },
        config: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    },
);

WalletSchema.statics.findOneOrCreate = async function (address) {
    let Wallet;
    Wallet = await this.findOne({ address });
    if (Wallet) {
        return Wallet;
    } else {
        Wallet = await this.create({
            address,
        });
        await Wallet.save();
        return Wallet;
    }
};

const Wallet =
    (mongoose.models.Wallet as mongoose.Model<IWalletSchema>) ||
    mongoose.model<IWalletSchema>("Wallet", WalletSchema);
export default Wallet;
