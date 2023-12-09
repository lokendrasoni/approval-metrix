export const minifySafeName = (name, maxChar) => {
    if (!name) return "";

    return name.length > maxChar ? `${name.substring(0, maxChar)}...` : name;
};

export const minifyName = (name, maxChar = 14) => {
    if (!name) return "";

    return name.length > maxChar ? `${name.substring(0, maxChar)}` : name;
};

export const minifyAddress = (address, middleChars = 6, endChars = 4) => {
    if (!address) return "";
    if (address.length < 20) return address;
    if (address.substr(-4) == ".eth") return address;
    return `${address.substring(0, middleChars + 2)}...${address.substring(
        address.length - endChars,
    )}`;
};

export const replaceAddresswithMinification = (string, middleChars = 7, endChars = 4) => {
    if (!string) return "";

    return string.replaceAll(/0x[a-zA-Z0-9]{40}/g, match => {
        return minifyAddress(match, middleChars, endChars);
    });
};

export const calculateMaxDecimalPlaces = (value, decimalPlaces = 3) => {
    const decimalValue = String(value).split(".")[1];
    if (!decimalValue) return 0;

    if (decimalValue.length > decimalPlaces) {
        const zeroStr = new Array(decimalPlaces).fill(0).join("");

        if (decimalValue.substring(0, decimalPlaces) === zeroStr) {
            // find index of first non-zero decimal place, add 1 to get number of decimal places
            return decimalValue.indexOf(decimalValue.match(/[1-9]/)[0]) + 1;
        } else {
            return decimalPlaces;
        }
    } else {
        return decimalValue.length;
    }
};

// avoid using this function, use getCommifiedNumberWitDecimal instead
export const formatAmount = (
    string,
    minDecimal = 0,
    maxDecimal = 2,
    trimDecimalPlaces = false,
    withDeno = false,
) => {
    const maxDecimalPlace = calculateMaxDecimalPlaces(string);
    if (!!maxDecimalPlace && trimDecimalPlaces && maxDecimalPlace < maxDecimal) {
        maxDecimal = maxDecimalPlace;
    }
    const truncatedString = truncate(string, maxDecimal);

    // Fifteen Zeroes for Quadrillion
    const calculations =
        Math.abs(Number(string)) >= 1.0e15
            ? truncate(Number(string) / 1.0e15, maxDecimal) + "Q"
            : // Twelve Zeroes for Trillions
              Math.abs(Number(string)) >= 1.0e12
              ? truncate(Number(string) / 1.0e12, maxDecimal) + "T"
              : // Nine Zeroes for Billions
                Math.abs(Number(string)) >= 1.0e9
                ? truncate(Number(string) / 1.0e9, maxDecimal) + "B"
                : // Six Zeroes for Millions
                  Math.abs(Number(string)) >= 1.0e6
                  ? truncate(Number(string) / 1.0e6, maxDecimal) + "M"
                  : Number(truncatedString).toLocaleString(undefined, {
                        minimumFractionDigits: minDecimal,
                        maximumFractionDigits: maxDecimal,
                    });
    Math.abs(Number(string)) >= 1.0e12
        ? truncate(Number(string) / 1.0e12, maxDecimal) + "T"
        : // Nine Zeroes for Billions
          Math.abs(Number(string)) >= 1.0e9
          ? truncate(Number(string) / 1.0e9, maxDecimal) + "B"
          : // Six Zeroes for Millions
            Math.abs(Number(string)) >= 1.0e6
            ? truncate(Number(string) / 1.0e6, maxDecimal) + "M"
            : Number(truncatedString).toLocaleString(undefined, {
                  minimumFractionDigits: minDecimal,
                  maximumFractionDigits: maxDecimal,
              });
    return withDeno ? `$${calculations}` : calculations;
};

export const formatAmountWithoutTruncate = (string, minDecimal = 0, maxDecimal = 2) => {
    return Number(string).toLocaleString(undefined, {
        minimumFractionDigits: minDecimal,
        maximumFractionDigits: maxDecimal,
    });
};

// avoid using this function, use getCommifiedNumberWitDecimal instead
export const formatAmountWithSymbol = (
    labelValue,
    minDecimal = 0,
    maxDecimal = 2,
    trimDecimalPlaces = false,
) => {
    // console.log("sss", Math.abs(Number(labelValue)) >= 1.0e12)
    if (Math.abs(Number(labelValue)) >= 1.0e15) {
        const value = formatAmount(
            Math.abs(Number(labelValue)) / 1.0e15,
            minDecimal,
            maxDecimal,
            trimDecimalPlaces,
        );
        if (value.length > 6) return value.substring(0, 6) + "...Q";
        return value + "Q";
    }

    if (Math.abs(Number(labelValue)) >= 1.0e12) {
        const value = formatAmount(
            Math.abs(Number(labelValue)) / 1.0e12,
            minDecimal,
            maxDecimal,
            trimDecimalPlaces,
        );
        // console.log(value);
        return value + "T";
    }
    if (Math.abs(Number(labelValue)) >= 1.0e9) {
        const value = formatAmount(
            Math.abs(Number(labelValue)) / 1.0e9,
            minDecimal,
            maxDecimal,
            trimDecimalPlaces,
        );
        return value + "B";
    }
    if (Math.abs(Number(labelValue)) >= 1.0e6) {
        const value = formatAmount(
            Math.abs(Number(labelValue)) / 1.0e6,
            minDecimal,
            maxDecimal,
            trimDecimalPlaces,
        );
        return value + "M";
    }

    // if (Math.abs(Number(labelValue)) >= 1.0e3) {
    //     const value = formatAmount(Math.abs(Number(labelValue)) / 1.0e3, minDecimal, maxDecimal);
    //     return value + "K";
    // }
    return formatAmount(Math.abs(Number(labelValue)), minDecimal, maxDecimal, trimDecimalPlaces);
};

export const truncate = (number, index = 2) => {
    // cutting the number

    if (Number(number) != Math.floor(number)) {
        if (number?.toString())
            return +number.toString().slice(0, number.toString().indexOf(".") + (index + 1));
    } else {
        return number;
    }
};

export function isValidURL(string) {
    let urlPattern =
        /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;
    let ipfsPattern = /^((ipfs|ipns|dweb):\/\/){1}([\w\d]+\/?\.?)+$/i;
    return urlPattern.test(string) || ipfsPattern.test(string);
}

export function isValidEmail(input) {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
}

// commify amount wihout converting to number, use for display only
// export const getCommifiedNumberWitDecimal = (
//     amount: number | string,
//     decimals = 2,
//     trimDecimalPlaces: boolean = false,
//     showFiatSymbol: boolean = false,
// ) => {
//     const amountString = amount.toString();
//     if (trimDecimalPlaces) {
//         const maxDecimal = calculateMaxDecimalPlaces(amountString, decimals);
//         if (maxDecimal && maxDecimal < decimals) {
//             decimals = maxDecimal;
//         }
//     }
//     const [integer, decimal] = amountString.split(".");
//     const commifiedInteger = integer.length > 0 ? commify(integer) : "0";
//     const IntegerWithSymbol = showFiatSymbol ? `$${commifiedInteger}` : commifiedInteger;
//     if (decimal && decimal.length > decimals) {
//         return `${IntegerWithSymbol}.${decimal.slice(0, decimals)}`;
//     }
//     return `${IntegerWithSymbol}${decimal?.length ? `.${decimal}` : ""}`;
// };

export const _adjustV = (v: number): number => {
    if (v === 0) {
        return 27;
    } else if (v === 1) {
        return 28;
    } else {
        return v;
    }
};

// export const adjustVInCustomSignature = (signature: string) => {
//     if (signature) {
//         const { v, r, s } = ethers.utils.splitSignature(signature);
//         const adjustedV = _adjustV(v);
//         return ethers.utils.joinSignature({ r, s, v: adjustedV });
//     } else {
//         return "";
//     }
// };

export const getNumberWitDecimal = (
    amount: number | string,
    decimals = 2,
    trimDecimalPlaces: boolean = false,
    showFiatSymbol: boolean = false,
) => {
    const amountString = amount.toString();
    if (trimDecimalPlaces) {
        const maxDecimal = calculateMaxDecimalPlaces(amountString, decimals);
        if (maxDecimal && maxDecimal < decimals) {
            decimals = maxDecimal;
        }
    }
    const [integer, decimal] = amountString.split(".");
    // const commifiedInteger = integer.length > 0 ? commify(integer) : "0";
    const IntegerWithSymbol = showFiatSymbol ? `$${integer}` : integer;
    if (decimal && decimal.length > decimals) {
        return `${IntegerWithSymbol}.${decimal.slice(0, decimals)}`;
    }
    return `${IntegerWithSymbol}${decimal?.length ? `.${decimal}` : ""}`;
};

// export const resolveENSWithInfura = async (ens: string) => {
//     const provider = new ethers.providers.InfuraProvider(
//         "homestead",
//         process.env.NEXT_PUBLIC_INFURA_TOKEN,
//     );
//     try {
//         const resolvedAddress = await provider.resolveName(ens);
//         return resolvedAddress;
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// };
