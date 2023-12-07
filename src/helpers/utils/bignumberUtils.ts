import { BigNumber, constants } from "ethers";
import { commify, formatUnits, parseUnits } from "ethers/lib/utils";

// used in to store react state to backend
export const stringNumberToWei = (number: number | string, decimal: number): string => {
    if (Number(number) <= 0) {
        const zero = constants.Zero;
        return zero?.toString();
    } else {
        const stringNumber = String(number);
        const bignumberParsed = parseUnits(stringNumber, decimal);
        return bignumberParsed?.toString();
    }
};

// used in convert back to backend wei format to string format in FE
export const weiToString = (wei: string | BigNumber, decimal: number): string => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigNumber.from(wei);
        return formatUnits(BignumberFromWei, decimal);
    } else return "0";
};

// same as above with commify
export const commifyWeiToString = (wei: string | BigNumber, decimal: number): string => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigNumber.from(wei);
        const formattedString = formatUnits(BignumberFromWei, decimal);
        return commify(formattedString);
    } else {
        return "0";
    }
};

//wrap simple wei to bignumber
export const bigNumberfromWei = (wei: string): BigNumber => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigNumber.from(wei);
        return BignumberFromWei;
    } else return constants.Zero;
};

//returns wei from a simple string with Bignumber wrapped
export const stringToBigNumberWei = (number: number | string, decimal: number): BigNumber => {
    if (!number || Number(number) <= 0) {
        const zero = constants.Zero;
        return zero;
    } else {
        const stringNumber = String(number);
        const bignumberParsed = parseUnits(stringNumber, decimal);
        return bignumberParsed;
    }
};

// just convert bignumber to string
export const bigNumberToString = wei => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigNumber.from(wei);
        return BignumberFromWei?.toString();
    } else return "0";
};
