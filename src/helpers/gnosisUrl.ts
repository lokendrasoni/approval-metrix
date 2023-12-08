export const getGnosisUrlByNetworkId = (networkId: number) => {
    switch (Number(networkId)) {
        case 1:
            return "https://safe-transaction-mainnet.safe.global/api/v1";
        case 4:
            return "https://safe-transaction.rinkeby.gnosis.io/api/v1";
        case 5:
            return "https://safe-transaction-goerli.safe.global/api/v1";
        case 10:
            return "https://safe-transaction-optimism.safe.global/api/v1";
        case 137:
            return "https://safe-transaction-polygon.safe.global/api/v1";
        case 56:
            return "https://safe-transaction-bsc.safe.global/api/v1";
        case 42161:
            return "https://safe-transaction-arbitrum.safe.global/api/v1";
        default:
            return "undefined";
    }
};

export function getGnosisBaseURL(chainId) {
    switch (Number(chainId)) {
        case 1:
            return "https://safe-transaction-mainnet.safe.global";
        case 4:
            return "https://safe-transaction.rinkeby.gnosis.io";
        case 5:
            return "https://safe-transaction-goerli.safe.global";
        case 10:
            return "https://safe-transaction-optimism.safe.global";
        case 137:
            return "https://safe-transaction-polygon.safe.global";
        case 42161:
            return "https://safe-transaction-arbitrum.safe.global";
        case 56:
            return "https://safe-transaction-bsc.safe.global";
        default:
            return "https://safe-transaction-goerli.safe.global";
    }
}

export function getNetworkIdFromGnosisUrl(url: string): number | undefined {
    const domain = new URL(url).hostname;
    switch (domain) {
        case "safe-transaction-mainnet.safe.global":
            return 1;
        case "safe-transaction.rinkeby.gnosis.io":
            return 4;
        case "safe-transaction-goerli.safe.global":
            return 5;
        case "safe-transaction-optimism.safe.global":
            return 10;
        case "safe-transaction-polygon.safe.global":
            return 137;
        case "safe-transaction-bsc.safe.global":
            return 56;
        case "safe-transaction-arbitrum.safe.global":
            return 42161;
        default:
            return undefined;
    }
}
export function getOwnerSafesFromGnosisByWallet(networkId: number | string, walletAddress: string) {
    return `${getGnosisBaseURL(networkId)}/api/v1/owners/${walletAddress}/safes`;
}

export function getChainIdentifier(networkId: number | string) {
    switch (+networkId) {
        case 1:
            return "eth";
        case 137:
            return "matic";
        case 4:
            return "rin";
        case 5:
            return "gor";
        case 10:
            return "oeth";
        case 42161:
            return "arb1";
        case 56:
            return "bnb";
        default:
            return "gor";
    }
}

export function getGnosisAppURL(networkId: number | string) {
    return `https://app.safe.global/${getChainIdentifier(networkId)}`;
}

export function getGnosisAppTxQueueURL(networkId: number | string, safeAddress: string) {
    return `${getGnosisAppURL(networkId)}:${safeAddress}/transactions/queue`;
}

export function getGnosisAppTxnURL(
    networkId: number | string,
    safeAddress: string,
    safeTxHash: string,
) {
    return `${getGnosisAppURL(
        networkId,
    )}:${safeAddress}/transactions/tx?id=multisig_${safeAddress}_${safeTxHash}`;
}
