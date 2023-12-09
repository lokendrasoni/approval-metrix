/**
 * <useMultiTokenInput>
 * @author Deepak Sindhwani <deepak@parcel.money>
 * @description useMultiTokenInput manages all validation and helpers function needed for handling multi tokeninput component and exposes array of tokenInput state to parent component
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1030%3A4008
 
<Init Props>
 * @param   {<TokensInSafeProps>} tokensInSafe <tokensInSafe should contains extensive details of a token , refer TokensInSafeProps in types>
 * @param   {<string>} intialTokenAddress <initial selected token addres if you want to pass , normally nativeTokenSymbol can be the case >
 * @param   {<boolean>}allowDuplicateToken if its false then it will send a flag called disabledAddMore which indicates that you can't add more tokens as you have all unique tokens in TokenInputList
 <Output> - The output of this hook can be used to feed Tokeninput component directly
 @return {<tokenInputList>} array of state variable contains all token related states see TOKEN_INPUT state for more details>
 @return {<handleAmountChange>} function to set and validate token amount change>
 @return {<handleTokenChange>} function to set and validate token address change>
 @return {<handleChangeFixedUsd>} function to set and validate fix usd selector change>
 @return {<handleFiatValueChange>} function to set and validate fiat amount change>
 @return {<addTokenInput>} function to increase the size of tokensInput state
 @return {<removeTokenInput>} function to delete the tokenInput at specified index
 @return {<validateTokenInput>} function to validate required fields and assign errors>
 @return {<disabledAddMore>} this will work with allowDuplicateToken props



  */

import Decimal from "decimal.js-light";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { roundOff, validNumberString } from "src/helpers/utils/common";

export default function useMultiTokenInput({
    tokensInSafe,
    initialState = [],
    intialTokenAddress = null,
    allowDuplicateToken = true,
    emptyInitialState = false,
    maxPositive = 10,
}) {
    const TOKEN_INPUT: any = {
        amount: "",
        fixedUsd: false,
        token: intialTokenAddress,
        fiatValue: "",
        errors: {
            amount: "",
            token: "",
        },
    };
    const [tokenInputList, setTokenInputList] = useState(() => {
        if (initialState?.length > 0) {
            return [...initialState];
        } else {
            if (emptyInitialState) {
                return [];
            } else {
                return [{ ...TOKEN_INPUT }];
            }
        }
    });
    const [disabledAddMore, setDisabledAddMore] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const resetTokenInput = () => {
        setTokenInputList([{ ...TOKEN_INPUT }]);
    };

    useEffect(() => {
        if (!allowDuplicateToken) {
            if (tokenInputList?.length == Object.values(tokensInSafe || {})?.length) {
                setDisabledAddMore(true);
            } else {
                setDisabledAddMore(false);
            }
            // const tokensAlreadyRequested = tokenInputList?.map(({ token }) => token);

            // const remainingTokens = Object.values(tokensInSafe || {})?.filter(
            //     ({ tokenAddress }) => !tokensAlreadyRequested.includes(tokenAddress),
            // );

            // if (remainingTokens?.length === 0) {
            //     setDisabledAddMore(true);
            // } else {
            //     setDisabledAddMore(false);
            // }
        }
    }, [tokenInputList, tokensInSafe, allowDuplicateToken]);

    const handleAmountChange = (e, amountValue, index) => {
        setTokenInputList(inputs => {
            const list = [...inputs];
            list[index]["amount"] = amountValue;
            list[index]["spendingLimitMaxValue"] = amountValue;
            list[index]["errors"]["amount"] = "";
            list[index]["errors"]["token"] = "";
            // const tokenValue = Number(amountValue);
            // const decimals = tokensInSafe[list[index]["token"]]?.decimals;
            // let decimalPlaces = amountValue && amountValue.toString().split(".")[1]?.length;
            // let wholePart = amountValue && amountValue.toString().split(".")[0]?.length;

            // if (tokenValue >= 0 && amountValue) {
            //     if (decimalPlaces && decimalPlaces > decimals) {
            //         enqueueSnackbar(snackBarText(`Token value can be 1 to ${decimals} decimals`), {
            //             variant: "warning",
            //         });
            //     } else if (wholePart && wholePart > maxPositive) {
            //     } else {
            //         list[index]["amount"] = amountValue;
            //         const usdValue =
            //             tokensInSafe[list[index]["token"]]?.fiatConversion * tokenValue;
            //         list[index]["fiatValue"] = roundOff(usdValue);
            //     }
            // } else {
            //     if (isNaN(tokenValue)) {
            //         enqueueSnackbar(snackBarText(`Please enter a valid number`), {
            //             variant: "error",
            //         });
            //     } else {
            //         list[index]["amount"] = "";
            //         list[index]["fiatValue"] = "";
            //     }
            // }
            console.log({ list });
            return list;
        });
    };

    const handleTokenChange = (e, newToken, index) => {
        setTokenInputList(inputs => {
            const list = [...inputs];
            list[index]["errors"]["amount"] = "";
            list[index]["errors"]["token"] = "";
            list[index]["token"] = newToken;
            return list;

            // if (tokensInSafe[newToken]?.fiatConversion === 0 && list[index]["fixedUsd"]) {
            //     list[index]["fixedUsd"] = false;
            //     list[index]["amount"] = "";
            //     list[index]["fiatValue"] = "";
            //     list[index]["token"] = newToken;
            //     return list;
            // } else {
            //     list[index]["token"] = newToken;
            //     const amount = list[index]["amount"];
            //     const tokenValue = Number(list[index]["amount"]);
            //     const decimals = tokensInSafe[newToken]?.decimals;
            //     const conversion = tokensInSafe[newToken].fiatConversion;
            //     const fiatAmount = Number(list[index]["fiatValue"]);

            //     if (!list[index]["fixedUsd"]) {
            //         if (tokenValue >= 0 && list[index]["amount"]) {
            //             let decimalPlaces = amount && amount.toString().split(".")[1]?.length;
            //             if (decimalPlaces && decimalPlaces > decimals) {
            //                 const fixedTokenValue = tokenValue.toFixed(decimals);
            //                 list[index]["amount"] = fixedTokenValue;
            //                 const usdValue = new Decimal(validNumberString(conversion)).times(
            //                     new Decimal(validNumberString(fixedTokenValue)),
            //                 );
            //                 list[index]["fiatValue"] = roundOff(usdValue);
            //             } else {
            //                 list[index]["amount"] = list[index]["amount"];
            //                 const usdValue = new Decimal(validNumberString(conversion)).times(
            //                     new Decimal(validNumberString(tokenValue)),
            //                 );
            //                 list[index]["fiatValue"] = roundOff(usdValue);
            //             }
            //             return list;
            //         } else {
            //             list[index]["amount"] = "";
            //             list[index]["fiatValue"] = "";
            //             return list;
            //         }
            //     } else {
            //         if (fiatAmount >= 0 && list[index]["fiatValue"]) {
            //             const fixedTokenValue = new Decimal(fiatAmount).dividedBy(
            //                 new Decimal(conversion),
            //             );
            //             let decimalPlaces = fixedTokenValue.toString().split(".")[1]?.length;
            //             list[index]["fiatValue"] = validNumberString(list[index]["fiatValue"]);

            //             if (decimalPlaces && decimalPlaces > decimals) {
            //                 list[index]["amount"] = fixedTokenValue?.toFixed(decimals);
            //             } else {
            //                 list[index]["amount"] = validNumberString(fixedTokenValue);
            //             }
            //             return list;
            //         } else {
            //             list[index]["amount"] = "";
            //             list[index]["fiatValue"] = "";
            //             return list;
            //         }
            //     }
            // }
        });
    };

    const handleChangeFixedUsd = (newValue, index) => {
        setTokenInputList(inputs => {
            const list = [...inputs];
            if (tokensInSafe[list[index]["token"]]?.fiatConversion === 0) {
                // enqueueSnackbar(snackBarText("Can't Enter Value in  USD for selected Token"), {
                //     variant: "warning",
                // });
            } else {
                list[index]["fixedUsd"] = newValue;
            }
            return list;
        });
    };

    const handleFiatValueChange = (e, value, index) => {
        // run any validation here if you want

        setTokenInputList(inputs => {
            const list = [...inputs];
            list[index]["errors"]["amount"] = "";
            list[index]["errors"]["token"] = "";
            const usdValue = Number(value);
            let decimalPlaces = value && value.toString().split(".")[1]?.length;
            const decimals = tokensInSafe[list[index]["token"]]?.decimals;
            if (usdValue >= 0 && value) {
                if (decimalPlaces && decimalPlaces > 2) {
                } else {
                    const tokenValue =
                        tokensInSafe[list[index]["token"]]?.fiatConversion == 0 ||
                        !tokensInSafe[list[index]["token"]]
                            ? 0
                            : new Decimal(usdValue).dividedBy(
                                  new Decimal(
                                      validNumberString(
                                          tokensInSafe[list[index]["token"]]?.fiatConversion,
                                      ),
                                  ),
                              );
                    list[index]["amount"] = roundOff(tokenValue, decimals);
                    list[index]["fiatValue"] = value;
                }
            } else {
                list[index]["amount"] = "";
                list[index]["fiatValue"] = "";
            }
            return list;
        });
    };

    const removeTokenInput = index => {
        setTokenInputList(inputs => {
            const list = [...inputs];
            list.splice(index, 1);
            return list;
        });
    };

    const addTokenInput = () => {
        const list = [...tokenInputList, { ...TOKEN_INPUT, token: "" }];
        setTokenInputList(list);
    };

    const validateTokenInput = () => {
        //validate required fields and set Error flag if any of field is missing
        const checkIfAllFieldsAreFilled = tokenInputList.every(
            ({ fixedUsd, fiatValue, amount, token }) => {
                if (fixedUsd) {
                    return fiatValue && Number(fiatValue) > 0 && token;
                } else {
                    return amount && Number(amount) > 0 && token;
                }
            },
        );
        if (!checkIfAllFieldsAreFilled) {
            const list = [...tokenInputList];
            list.forEach(({ amount, fiatValue, fixedUsd, token }, index) => {
                if (fixedUsd && (!fiatValue || Number(fiatValue) === 0)) {
                    list[index]["errors"]["amount"] = "Required Field";
                }

                if (!fixedUsd && (!amount || Number(amount) === 0)) {
                    list[index]["errors"]["amount"] = "Required Field";
                }

                if (!token) {
                    list[index]["errors"]["token"] = "Required Field";
                }
            });
            setTokenInputList(list);
            return false;
        } else {
            const list = [...tokenInputList];
            list.forEach(({}, index) => {
                list[index]["errors"]["amount"] = "";
                list[index]["errors"]["token"] = "";
            });
            setTokenInputList(list);
            return true;
        }
    };
    return {
        tokenInputList,
        disabledAddMore,
        handleAmountChange,
        handleTokenChange,
        handleChangeFixedUsd,
        handleFiatValueChange,
        addTokenInput,
        removeTokenInput,
        validateTokenInput,
        resetTokenInput,
        setTokenInputList,
    };
}
