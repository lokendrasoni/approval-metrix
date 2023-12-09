import authenticate from "middleware/authenticate";
import Wallet from "models/Wallet";
import { NextApiRequest, NextApiResponse } from "next";
interface NextRequest extends NextApiRequest {
    walletAddress?: string;
    networkId?: number;
}

const handler = async (req: NextRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method !== "GET") {
        res.status(400).json({ success: false, message: "Only GET requests are allowed!" });
    }

    let wallet = await Wallet.findOne({ address: req?.walletAddress }).populate("contributedSafes");

    if (!wallet) {
        return res.status(403).json({
            success: false,
            message: "Wallet does not exist",
        });
    }

    wallet = wallet?.toObject();

    const safes =
        wallet?.contributedSafes?.map(safe => {
            delete safe["contributors"];
            return safe;
        }) || [];
    delete wallet["contributedSafes"];

    res.status(200).json({
        success: true,
        safes,
        wallet,
    });
};

export default authenticate(handler);
