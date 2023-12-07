import authenticate from "middleware/authenticate";
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
    res.status(200).json({
        success: true,
        message: "Auth token valid!",
        walletAddress: req?.walletAddress,
        networkId: req?.networkId,
    });
};

export default authenticate(handler);
