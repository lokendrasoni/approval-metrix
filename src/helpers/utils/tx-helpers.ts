import { parseUnits } from "ethers";

import { ethers } from "ethers";
import fromExponential from "from-exponential";

export const getAmountInWei = (tokenAmount = "0", decimals) => {
    // return BigNumber.from(tokenAmount).mul(
    //   BigNumber.from(String(10 ** decimals))
    // );
    if (tokenAmount == ".") return "0";
    if (decimals == 0) return tokenAmount;
    const amount = !!tokenAmount?.length ? tokenAmount : "0";
    return parseUnits(amount, decimals);
};

export const getAmountFromWei = (tokenAmount: any, decimals: any, precision = undefined): any => {
    let amount = tokenAmount;
    if (typeof tokenAmount === "string") {
        if (tokenAmount.includes("e")) {
            amount = fromExponential(tokenAmount);
        } else {
            amount = tokenAmount.split(".")[0];
        }
    }
    if (precision) {
        return Number(ethers.formatUnits(amount, decimals)).toFixed(precision);
    }
    return Number(ethers.formatUnits(amount, decimals));
};
