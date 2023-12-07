import { Chain } from "utils/types/Networks";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_TOKEN;
const QUICKNODE_TOKEN = process.env.NEXT_PUBLIC_QUICKNODE_TOKEN;

export const supportedChains: Chain[] = [
    {
        chainId: 1,
        id: "0x1",
        token: "ETH",
        label: "Ethereum",
        rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/62V7EBvEFRA6DT_0RnOdq1c3ZH997ldQ`,
    },
    {
        chainId: 5,
        id: "0x5",
        token: "GoerliETH",
        label: "Goerli",
        rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    },
    {
        chainId: 137,
        id: "0x89",
        token: "MATIC",
        label: "Polygon",
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/KkYaBKrqpT33KKsvNdV2Yr649WyUEHc9",
    },
    {
        chainId: 10,
        id: 10,
        token: "oETH",
        label: "Optimism",
        rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/IFX-EtIJ8WW6_fZY5b58XdUXgHZhc38t`,
    },
    {
        chainId: 42161,
        id: 42161,
        token: "ARB-ETH",
        label: "Arbitrum",
        rpcUrl: "https://arb-mainnet.g.alchemy.com/v2/W6PJjG2Cwa2ctl8gIrVlYBl-cGsLOdCs",
    },
    {
        chainId: 56,
        id: "0x38",
        token: "BNB",
        label: "Binance",
        rpcUrl: `https://light-palpable-tent.bsc.discover.quiknode.pro/${QUICKNODE_TOKEN}/`,
    },
];
