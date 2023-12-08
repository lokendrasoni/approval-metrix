export function getBlockExplorerURL(chainId) {
    switch (+chainId) {
        case 1:
            return "https://etherscan.io";
        case 137:
            return "https://polygonscan.com";
        case 4:
            return "https://rinkeby.etherscan.io";
        case 5:
            return "https://goerli.etherscan.io";
        case 10:
            return "https://optimistic.etherscan.io";
        case 42161:
            return "https://arbiscan.io";
        case 56:
            return "https://bscscan.com";
        default:
            return "https://etherscan.io";
    }
}
