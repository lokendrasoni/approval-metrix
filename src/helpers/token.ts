export function getNativeTokenSymbol(chainId) {
    switch (chainId) {
        case 1:
            return "ETH";
        case 137:
            return "MATIC";
        case 4:
            return "rETH";
        case 5:
            return "gETH";
        case 10:
            return "opETH";
        case 42161:
            return "aETH";
        case 56:
            return "BNB";
        default:
            return "ETH";
    }
}

// Logo URIs
export const getNativeIconUrl = chainId => {
    switch (chainId) {
        case 10:
        case 42161:
        case 1:
        case 4:
        case 5:
            return "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png";
        case 137:
            return "https://storage.googleapis.com/zapper-fi-assets/tokens/polygon/0x0000000000000000000000000000000000000000.png";
        case 56:
            return "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xb8c77482e45f1f44de1745f52c74426c631bdd52.png";

        default:
            return "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png";
    }
};

export function getNativeTokenName(chainId) {
    switch (Number(chainId)) {
        case 1:
            return "ETHEREUM";
        case 137:
            return "MATIC";
        case 4:
            return "RINKBEY ETHER";
        case 5:
            return "Görli Ether";
        case 10:
            return "Optimism Ether";
        case 56:
            return "BNB";
        case 42161:
            return "Arbitrum Ethereum";
        default:
            return "ETHEREUM";
    }
}
