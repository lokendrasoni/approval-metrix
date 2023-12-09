import fetchJSON from "src/queries/fetchJSON";
import { getOwnerSafesFromGnosisByWallet } from "../gnosisUrl";

export interface SafeListByChainId {
    [chainId: string]: {
        safes: string[];
    };
}

export const getOwnedSafesByChainId = async (walletAddress: string): Promise<SafeListByChainId> => {
    const safeObj: SafeListByChainId = {};

    const chains = [5];

    const response = chains.map(async networkId => {
        const url = getOwnerSafesFromGnosisByWallet(networkId, walletAddress);
        const response = await fetchJSON(url);

        if (response?.safes?.length) {
            safeObj[networkId] = {
                safes: response.safes || [],
            };
        }
    });

    await Promise.all(response);

    return safeObj;
};
