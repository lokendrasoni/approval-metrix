/**
 * <TokenInput>
 * @description Creates a TokenInput
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1030%3A4008
 * @comments : To use this component and manage its token related state , we have two hooks for that useSingleTokenInput , useMultiTokenInput .
 
 * @param   {<string>} label <label for TokenInput , by default value = "Amount" [optional parameter]>
 * @param   {<string>} index <index props is used as argument in callback function [described below] optional parameter>
 * @param   {<string>} amount <token amount[required]>
 * @param   {<string>} token <token address [required]>
 * @param   {<boolean>} fixedUsd <describes if token is fixed usd or fixed token [required]>
 * @param   {<string>} fiatValue <usd value of token amount , if fixed token is selected it will convert multiply token amount * fiatconversion , if fixed usd is selected input will directly apply to fiatvalue [required]>
 * @param   {<Func>} handleAmountChange <callback function when fixed token is selected token amount change , it calls with (e,newAmount,index) where index is from props [required]>
 * @param   {<Func>} handleTokenChange <callback function when token address change , it calls with (e,newTokenAddress,index) where index is from props [required]>
 * @param   {<Func>} handleChangeFixedUsd <callback function when fixed Usd flags change , it calls with (fixUsdBoolean,index) where index is from props [required]>
 * @param   {<Func>} handleFiatValueChange <callback function when fixed usd is selected & fiat amount change , it calls with (e,newFiatValue,index) where index is from props [required]>
 * @param   {<Object>} componentStyles <style object applies on Wrapper of component [optional]>
 * @param   {<string>} size <size of Component , "large"|"regular" [required],"large" as default>
 * @param   {<string>} type <different variant of Component available as per design "primary" | "secondary" | "error",[required],"secondary" as default >
 * @param   {<string>} infoText <this is used to display any extra info and error just below the Dropdown component[optional] >
 * @param   {<string>} disabled <disabled flag for whole component [optional]>
 * @param   {<string>} disableTokenChange <flag to disable token change [optional]>
 * @param   {<string>} disabledToggleUsd <flag to disable toggle fixed usd [optional]>
 * @param   {<number>} menuLeftMargin <handles left margin for menu option to open [optional]>
 * @param   {<[TokenInputOptionsProps]>} options <options that can be passed for dropdown , see TokenInputOptionsProps types for more info [required]>
 * @param   {<boolean>} seperator <creates a seperator b/w MenuItems [optional]>
 * @param   {<string>} placeholder <placeholder text when nothing has been selected in Component[optional] >
 * @param   {<string>} required <a red asterisk will appear next to label if required is true [optional]>
 * @param   {<boolean>} doNotShowDuplicateOption <flag to indicates the do now show tokens that has been already selected>
 * @param   {<[tokenAddress]>} uniqueTokensRequested <array of tokenAddress that has already been selected >
 * @return  {<JSX.Element>}  <TokenInput comp will be returned according to the props provided>
 */

import { InputLabel, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { NumericFormat } from "react-number-format";

import UndiscoveredCoin from "assets/Undiscovered-Coin.svg";
import TokenLogo from "../TokenLogo";
import { ComponentWrapper, DollarContainer, StyledInputField, StyledSelect } from "./style";
import { TokenInputProps } from "./types";
import { renderOptions, renderToken } from "./utils";

const TokenInput = ({
    label = "Amount",
    index = null,
    amount,
    options = [],
    handleAmountChange,
    token,
    handleTokenChange,
    fixedUsd,
    handleChangeFixedUsd,
    componentStyles = {},
    disabled = false,
    fiatValue,
    handleFiatValueChange,
    tokensInSafe = {},
    menuLeftMargin = -2,
    menuTopMargin = 2,
    required = true,
    disableTokenChange = false,
    disabledToggleUsd = false,
    type = "secondary",
    size = "large",
    infoText = "",
    seperator = false,
    placeholder = "Token",
    doNotShowDuplicateOption = false,
    uniqueTokensRequested,
    isNonFixedUSD = false,
}: TokenInputProps) => {
    // init state values
    const [hoverState, setHoverState] = useState(false);
    const [componentActive, setComponentActive] = useState(false);
    const [componentHover, setComponentHover] = useState(false);
    const [selectedToken, setSelectedToken] = useState("USDC");

    // init functions
    const handleAmountChageCallback = useCallback(
        (e: any) => {
            const value = e.target.value;
            // remove any other character except numbers, and dot
            const rectifiedValue = value.replace(/[^0-9.]/g, "");
            handleAmountChange(e, rectifiedValue, index);
        },
        [handleAmountChange, index],
    );

    return (
        <ComponentWrapper styles={{ ...componentStyles }}>
            {label && (
                <div>
                    <InputLabel
                        sx={{
                            marginBottom: "5px",
                            fontSize: "12px",
                            lineHeight: "12px",
                            color: "#636b81",
                            fontWeight: 500,
                        }}
                        shrink={false}
                    >
                        {label}
                        {required && <span style={{ color: "red" }}>*</span>}
                    </InputLabel>
                </div>
            )}
            <div style={{ display: "flex" }}>
                <DollarContainer
                    isNonFixedUSD={isNonFixedUSD}
                    disabled={disabled}
                    type={type}
                    size={size}
                    hover={componentHover}
                    onMouseOut={() => {
                        setHoverState(false);
                        setComponentHover(false);
                    }}
                    onMouseOver={() => setComponentHover(true)}
                    active={componentActive}
                >
                    {!isNonFixedUSD ? (
                        renderToken({
                            disabled,
                            fixedUsd,
                            disabledFixUsd: disabledToggleUsd,
                            setHoverState,
                            handleChangeFixedUsd,
                            hoverState,
                            index,
                            type,
                            componentHover,
                            componentActive,
                        })
                    ) : (
                        <TokenLogo
                            imageUrl={tokensInSafe[selectedToken]?.logoUri}
                            size="16px"
                            brokenLogo={tokensInSafe[selectedToken]?.brokenLogo}
                            wrapperStyle={{ " span": { verticalAlign: "baseline" } }}
                        />
                    )}
                </DollarContainer>
                <div style={{ width: "100%" }}>
                    {fixedUsd ? (
                        <StyledInputField
                            varianttype={type}
                            size={size}
                            hover={componentHover}
                            active={componentActive}
                            disabled={disabled}
                            variant="outlined"
                            placeholder="0.00"
                            type="number"
                            inputProps={{
                                step: "0.1",
                            }}
                            value={fiatValue}
                            required={false}
                            name="fiatValue"
                            sx={{ width: "100%" }}
                            onMouseOver={() => setComponentHover(true)}
                            onMouseOut={() => setComponentHover(false)}
                            onFocus={() => setComponentActive(true)}
                            onBlur={() => setComponentActive(false)}
                            onChange={e => handleFiatValueChange(e, e.target.value, index)}
                            InputProps={{
                                endAdornment: fixedUsd && (
                                    <Typography
                                        style={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#8B91A1",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        USD of
                                    </Typography>
                                ),
                            }}
                        />
                    ) : (
                        <StyledInputField
                            varianttype={type}
                            size={size}
                            hover={componentHover}
                            active={componentActive}
                            disabled={disabled}
                            variant="outlined"
                            placeholder="0.00"
                            type="text"
                            inputProps={{
                                step: "0.1",
                            }}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            value={amount}
                            required={false}
                            name="amount"
                            sx={{ width: "100%" }}
                            onMouseOver={() => setComponentHover(true)}
                            onMouseOut={() => setComponentHover(false)}
                            onFocus={() => setComponentActive(true)}
                            onBlur={() => setComponentActive(false)}
                            onChange={e => handleAmountChageCallback(e)}
                            autoComplete="off"
                        />
                    )}
                </div>

                <div style={{ minWidth: 100 }}>
                    <StyledSelect
                        displayEmpty={Boolean(placeholder)}
                        type={type}
                        size={size}
                        disabled={disabled || disableTokenChange}
                        hover={componentHover}
                        active={componentActive}
                        value={token}
                        name="token"
                        onMouseOver={() => setComponentHover(true)}
                        onMouseOut={() => setComponentHover(false)}
                        onChange={e => handleTokenChange(e, e.target.value, index)}
                        MenuProps={{
                            elevation: 0,
                            sx: {
                                overflow: "auto",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: menuTopMargin,
                                ml: menuLeftMargin,
                                width: "100%",

                                " .MuiPaper-root": {
                                    " .MuiList-root": {
                                        minWidth: "280px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        width: "100%",
                                        maxHeight: "250px",
                                    },
                                },
                            },
                        }}
                        renderValue={(selected: any) => {
                            if (selected) {
                                setSelectedToken(selected);
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            minHeight: "inherit",
                                        }}
                                    >
                                        {!isNonFixedUSD && (
                                            <img
                                                src={tokensInSafe[selected]?.logoUri}
                                                alt={tokensInSafe[selected]?.symbol}
                                                width="20px"
                                                height="20px"
                                                style={{ marginRight: "10px" }}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = UndiscoveredCoin.src;
                                                }}
                                            />
                                        )}
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 500,
                                                lineHeight: "12px",
                                            }}
                                        >
                                            {tokensInSafe[selected]?.symbol}
                                        </Typography>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={UndiscoveredCoin.src}
                                            alt={"No Token"}
                                            width="20px"
                                            height="20px"
                                            style={{ marginRight: "10px" }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: 500,
                                                lineHeight: "12px",
                                                color: "#ADB1BD",
                                            }}
                                        >
                                            Token
                                        </Typography>
                                    </div>
                                );
                            }
                        }}
                    >
                        {renderOptions(
                            options,
                            UndiscoveredCoin,
                            seperator,
                            doNotShowDuplicateOption,
                            uniqueTokensRequested,
                            tokensInSafe,
                        )}
                    </StyledSelect>
                </div>
            </div>

            {infoText && (
                <Typography
                    fontWeight={500}
                    fontSize="12px"
                    lineHeight="18px"
                    color={type === "error" ? "red" : disabled ? "black" : "black"}
                    mt={"4px"}
                >
                    {infoText}
                </Typography>
            )}
        </ComponentWrapper>
    );
};

export default TokenInput;

const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={true}
            isNumericString={true}
        />
    );
};
