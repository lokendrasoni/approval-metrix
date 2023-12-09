import { ZeroAddress, formatUnits, parseUnits } from "ethers";

// used in to store react state to backend
export const stringNumberToWei = (number: number | string, decimal: number): string => {
    if (Number(number) <= 0) {
        const zero = ZeroAddress;
        return zero?.toString();
    } else {
        const stringNumber = String(number);
        const bignumberParsed = parseUnits(stringNumber, decimal);
        return bignumberParsed?.toString();
    }
};

// used in convert back to backend wei format to string format in FE
export const weiToString = (wei: string | bigint, decimal: number): string => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigInt(wei);
        return formatUnits(BignumberFromWei, decimal);
    } else return "0";
};

//wrap simple wei to bignumber
export const bigNumberfromWei = (wei: string): bigint | string => {
    if (!!wei && Number(wei) > 0) {
        const BignumberFromWei = BigInt(wei);
        return BignumberFromWei;
    } else return ZeroAddress;
};

//returns wei from a simple string with Bignumber wrapped
export const stringToBigNumberWei = (number: number | string, decimal: number): bigint | string => {
    if (!number || Number(number) <= 0) {
        const zero = ZeroAddress;
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
        const BignumberFromWei = BigInt(wei);
        return BignumberFromWei?.toString();
    } else return "0";
};
