/**
 * <useSingleToken>
 * @author Deepak Sindhwani <deepak@parcel.money>
 * @description useSingleToken manages all validation and helpers function needed for token input component and exposes the needed state to parent component
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1030%3A4008
 
<Init Props>
 * @param   {<TokensInSafeProps>} tokensInSafe <tokensInSafe should contains extensive details of a token , refer TokensInSafeProps in types>
 * @param   {<string>} intialTokenAddress <initial selected token addres if you want to pass , normally nativeTokenSymbol can be the case >
 * 
 <Output> - The output of this hook can be used to feed Tokeninput component directly
 @return {<amount>} state variable contains token amount>
 @return {<fiatValue>} state variable contains fiat value amount>
 @return {<fixedUsd>} state variable of fixUsd selector toggle>
 @return {<token>} state variable contains token address>
 @return {<handleAmountChange>} function to set and validate token amount change>
 @return {<handleTokenChange>} function to set and validate token address change>
 @return {<handleChangeFixedUsd>} function to set and validate fix usd selector change>
 @return {<handleFiatValueChange>} function to set and validate fiat amount change>
 @return {<validateTokenInput>} function to validate required fields and calculate errors>
 @return {<errorString>} state to indicate the error string>


  */

import Decimal from "decimal.js-light";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { roundOff, validNumberString } from "src/helpers/utils/common";
import useInputChange from "src/hooks/useInputChange";

export default function useSingleTokenInput({
    tokensInSafe,
    intialTokenAddress = null,
    istokenAmountSameAsFiat = false,
}) {
    const [amount, setAmount] = useState<any>("");
    const [fiatValue, setFiatValue] = useState<any>("");
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState(intialTokenAddress);
    const [fixedUsd, setFixedUsd] = useState(false);
    const [errorString, setErrorString] = useState("");

    const { handleAmountChangeWithUSD } = useInputChange();

    const handleAmountChange = (e, amountValue, setError) => {
        setErrorString("");
        const decimals = fixedUsd ? 2 : tokensInSafe[token]?.decimals;
        const fiatConversion = tokensInSafe[token]?.fiatConversion;
        const tokenSymbol = fixedUsd ? "Fiat" : tokensInSafe[token]?.symbol;

        handleAmountChangeWithUSD(
            amountValue,
            setAmount,
            setFiatValue,
            decimals,
            tokenSymbol,
            fiatConversion,
            istokenAmountSameAsFiat,
            setError,
        );
    };

    const handleTokenChange = (e, newToken) => {
        setErrorString("");
        // run any validation here if you want
        if (tokensInSafe[newToken]?.fiatConversion === 0 && fixedUsd) {
            setFixedUsd(false);
            setAmount(0);
            setFiatValue(0);
            setToken(newToken);
            return;
        }
        setToken(newToken);
        const tokenValue = Number(amount);
        const decimals = tokensInSafe[newToken]?.decimals;
        const fiatAmount = Number(fiatValue);
        const conversion = tokensInSafe[newToken]?.fiatConversion;

        if (!fixedUsd) {
            if (tokenValue >= 0 && amount) {
                let decimalPlaces = amount && amount.toString().split(".")[1]?.length;
                if (decimalPlaces && decimalPlaces > decimals) {
                    const fixedTokenValue = tokenValue.toFixed(decimals);
                    setAmount(fixedTokenValue);
                    const calculatedUsdValue = new Decimal(validNumberString(conversion)).times(
                        new Decimal(validNumberString(fixedTokenValue)),
                    );
                    const usdValue = istokenAmountSameAsFiat
                        ? fixedTokenValue
                        : roundOff(calculatedUsdValue);
                    setFiatValue(usdValue);
                } else {
                    setAmount(amount);
                    const calculatedUsdValue = !conversion
                        ? "0"
                        : new Decimal(validNumberString(conversion)).times(
                              new Decimal(validNumberString(tokenValue)),
                          );
                    const usdValue = istokenAmountSameAsFiat
                        ? amount
                        : roundOff(calculatedUsdValue);
                    setFiatValue(usdValue);
                }
            } else {
                setAmount("");
                setFiatValue("");
            }
        } else {
            if (fiatAmount >= 0 && fiatValue) {
                const fixedTokenValue = istokenAmountSameAsFiat
                    ? new Decimal(fiatAmount)
                    : new Decimal(fiatAmount).dividedBy(new Decimal(conversion));
                let decimalPlaces = fixedTokenValue.toString().split(".")[1]?.length;
                setFiatValue(validNumberString(fiatValue));
                if (decimalPlaces && decimalPlaces > decimals) {
                    setAmount(fixedTokenValue.toFixed(decimals));
                } else {
                    setAmount(validNumberString(fixedTokenValue));
                }
            } else {
                setAmount("");
                setFiatValue("");
            }
        }
    };

    const handleChangeFixedUsd = newValue => {
        setErrorString("");
        // run any validation here if you want
        if (!!newValue && tokensInSafe[token]?.fiatConversion === 0) {
            return;
            // enqueueSnackbar(snackBarText("Can't Enter Value in  USD for selected Token"), {
            //     variant: "warning",
            // });
        } else {
            setFixedUsd(newValue);
        }
    };

    const handleFiatValueChange = (e, value) => {
        setErrorString("");
        // run any validation here if you want
        const usdValue = Number(value);
        let decimalPlaces = value && value.toString().split(".")[1]?.length;
        const decimals = tokensInSafe[token]?.decimals;
        if (usdValue >= 0 && value) {
            if (decimalPlaces && decimalPlaces > 2) {
                return;
            } else {
                const tokenValue =
                    tokensInSafe[token]?.fiatConversion == 0
                        ? 0
                        : new Decimal(usdValue).dividedBy(tokensInSafe[token]?.fiatConversion);
                setFiatValue(value);
                setAmount(roundOff(tokenValue, decimals));
            }
        } else {
            setAmount("");
            setFiatValue("");
        }
    };

    const validateTokenInput = () => {
        //validate required fields and set Error flag if any of field is missing
        let hasError = false;
        if (fixedUsd) {
            if (!fiatValue || Number(fiatValue) === 0 || !token) {
                if (Number(fiatValue) === 0) {
                    hasError = true;
                    setErrorString("Usd amount must be greater than zero");
                } else if (!fiatValue) {
                    hasError = true;
                    setErrorString("Usd amount required");
                }
                if (!token) {
                    hasError = true;
                    setErrorString("Select Token");
                }
            } else {
                setErrorString("");
            }
        } else {
            if (!amount || Number(amount) === 0 || !token) {
                if (Number(amount) === 0) {
                    hasError = true;
                    setErrorString("Amount must be greater than zero");
                } else if (!amount) {
                    hasError = true;
                    setErrorString("Token amount required");
                }
                if (!token) {
                    hasError = true;
                    setErrorString("Select Token");
                }
            } else {
                setErrorString("");
            }
        }

        return hasError;
    };

    return {
        amount,
        fiatValue,
        token,
        fixedUsd,
        handleAmountChange,
        handleTokenChange,
        handleChangeFixedUsd,
        handleFiatValueChange,
        validateTokenInput,
        errorString,
    };
}
