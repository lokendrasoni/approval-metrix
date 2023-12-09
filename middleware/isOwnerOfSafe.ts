import { getOwnedSafesByChainId } from "src/helpers/cache/safe-service";
import dbConnect from "utils/dbConnect";
import { ISafeSchema } from "utils/types/SafeModel";

const isOwnerOfSafe = (handler, withoutCache = false) => {
    return async (req, res) => {
        try {
            const safe: ISafeSchema = req?.safe;
            if (!safe) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Safe",
                });
            }

            const connection = await dbConnect();
            if (!connection) {
                throw new Error("db connection failed");
            }

            const walletAddress = req.walletAddress;
            const networkId = req.networkId;
            const allSafes = await getOwnedSafesByChainId(walletAddress, withoutCache);
            const safes = allSafes?.[networkId.toString()]?.safes || [];

            if (safes?.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Connected wallet is not a owner of this safe",
                });
            }

            if (!safes?.includes(safe?.safeAddress)) {
                return res.status(401).json({
                    success: false,
                    message: "Connected wallet is not a owner of this safe",
                });
            }

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
