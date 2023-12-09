import { getOwnedSafesByChainId } from "src/helpers/cache/safe-service";
import dbConnect from "utils/dbConnect";

const isOwnerOfSafe = (handler, withoutCache = false) => {
    return async (req, res) => {
        try {
            const connection = await dbConnect();
            if (!connection) {
                throw new Error("db connection failed");
            }

            const networkId: number | null = req.headers["x-par-network-id"];
            const safeAddress: string | null = req.headers["x-par-safe-address"] || null;
            const walletAddress: string | null = req.headers["x-par-wallet-address"] || null;

            const allSafes = await getOwnedSafesByChainId(walletAddress, withoutCache);
            const safes = allSafes?.[networkId.toString()]?.safes || [];

            if (safes?.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Connected wallet is not a owner of this safe",
                });
            }

            if (!safes?.includes(safeAddress)) {
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
const HOF = (handler, withoutCache = false) => isOwnerOfSafe(handler, withoutCache);
export default HOF;
