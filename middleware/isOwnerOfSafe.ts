import { getOwnedSafesByChainId } from "src/helpers/cache/safe-service";
import dbConnect from "utils/dbConnect";

const isOwnerOfSafe = handler => {
    return async (req, res) => {
        try {
            const connection = await dbConnect();
            if (!connection) {
                throw new Error("db connection failed");
            }

            const networkId: number | null = req.headers["x-par-network-id"];
            const safeAddress: string | null = req.headers["x-par-safe-address"] || null;
            const walletAddress: string | null = req.headers["x-par-wallet-address"] || null;

            const allSafes = await getOwnedSafesByChainId(walletAddress);
            const safes = allSafes?.[networkId.toString()]?.safes || [];

            console.log("allSafes", allSafes);
            if (safes?.length === 0) {
                console.log("due to this");
                return res.status(401).json({
                    success: false,
                    message: "Connected wallet is not a owner of this safe",
                });
            }

            if (!safes?.includes(safeAddress)) {
                console.log("due to ff");
                return res.status(401).json({
                    success: false,
                    message: "Connected wallet is not a owner of this safe",
                });
            }
            req.safeAddress = safeAddress;
            req.networkId = networkId;
            req.walletAddress = walletAddress;

            return handler(req, res);
        } catch (error) {
            console.log({ error });

            return res
                .status(401)
                .json({ success: false, message: "Please log in to get access!" });
        }
    };
};
const HOF = handler => isOwnerOfSafe(handler);
export default HOF;
