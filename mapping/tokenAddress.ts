import { ethers } from "ethers";
import { ZERO_ADDRESS } from "src/constants/address";

export const covertTokenAddressToContractLevel = (nativeTokenSymbol, tokenAddress) => {
    if (tokenAddress?.toLowerCase() == nativeTokenSymbol?.toLowerCase()) {
        return ZERO_ADDRESS;
    } else {
        return tokenAddress;
    }
};

export const getTokenContractAddress = tokenAddress => {
    if (!ethers.isAddress(tokenAddress)) {
        return ZERO_ADDRESS;
    } else {
        return tokenAddress;
    }
};
