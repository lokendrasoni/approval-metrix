import { supportedChains } from "src/constants/supportedNetwork";

export interface Chain {
    chainId: number;
    id: string | number;
    token: string;
    label: string;
    rpcUrl: string;
}

export type supportedNetwork = (typeof supportedChains)[number]["chainId"];
