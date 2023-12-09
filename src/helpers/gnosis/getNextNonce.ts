import SafeApiKit, { SafeMultisigTransactionListResponse } from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import fetchJSON from "src/queries/fetchJSON";
import { getGnosisUrlByNetworkId } from "../gnosisUrl";

export const getNextNonce = async (
    safeAddress: string,
    networkId: number,
    safeService: SafeApiKit,
    safeSdk: Safe,
): Promise<number> => {
    const gnosisUrl: string = getGnosisUrlByNetworkId(networkId);
    const currentNonce = await safeSdk?.getNonce();
    const lastTrustedPendingTransaction: SafeMultisigTransactionListResponse = await fetchJSON(
        `${gnosisUrl}/safes/${safeAddress}/multisig-transactions?executed=false&trusted=true&limit=1&nonce__gte=${currentNonce}`,
    );

    if (lastTrustedPendingTransaction?.results?.length > 0) {
        console.log("due to it");
        return Number(lastTrustedPendingTransaction.results[0]?.nonce) + 1;
    } else {
        console.log("dueto this");
        return await safeService?.getNextNonce(safeAddress);
    }
};
