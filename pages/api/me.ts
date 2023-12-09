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

    const wallet = await Wallet.findOne({ address: req?.walletAddress });

    if (!wallet) {
        return res.status(403).json({
            success: false,
            message: "Wallet does not exist",
        });
    }

    res.status(200).json({
        success: true,
        message: "Auth token valid!",
        walletAddress: req?.walletAddress,
        networkId: req?.networkId,
    });
};

export default authenticate(handler);
