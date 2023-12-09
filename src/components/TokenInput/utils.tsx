import { Typography } from "@mui/material";

import { ethers } from "ethers";
import { minifyAddress } from "src/helpers/utils/web3Utils";
import TokenLogo from "../TokenLogo";
import Tooltip from "../Tooltip";
import { StyledMenuItem } from "./style";
export const renderOptions = (
    options,
    UndiscoveredCoin,
    seperator,
    doNotShowDuplicateOption,
    uniqueTokensRequested = [],
    tokensInSafe,
) => {
    let calculatedOptions = options;
    if (doNotShowDuplicateOption) {
        calculatedOptions = options?.map(({ tokenAddress, ...other }) => {
            return {
                ...other,
                tokenAddress,
                hide: uniqueTokensRequested.includes(tokenAddress),
            };
        });
    }
    if (calculatedOptions?.every(({ hide }) => hide)) {
        return (
            <StyledMenuItem key={"0x"} value={""} disabled>
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "12px",
                    }}
                >
                    No Tokens Available
                </Typography>
            </StyledMenuItem>
        );
    }
    if (calculatedOptions.length > 0) {
        const MenuItems = calculatedOptions.map(
            ({ name, symbol, logoUri, tokenAddress, hide }: any) => (
                <StyledMenuItem
                    key={tokenAddress}
                    value={tokenAddress}
                    seperator={seperator}
                    style={{ display: hide && "none" }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "baseline",
                        }}
                    >
                        <TokenLogo
                            imageUrl={logoUri}
                            size="16px"
                            brokenLogo={tokensInSafe[tokenAddress]?.brokenLogo}
                        />
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "12px",
                                marginLeft: "8px",
                            }}
                        >
                            {name}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "12px",
                                color: "#8B91A1;",
                            }}
                        >
                            {"  "}(
                            {ethers.isAddress(tokenAddress) ? minifyAddress(tokenAddress) : symbol})
                        </Typography>
                    </div>
                </StyledMenuItem>
            ),
        );

        return [
            ...MenuItems,
            <StyledMenuItem
                value={null}
                seperator={seperator}
                style={{ display: "none" }}
            ></StyledMenuItem>,
        ];
    } else {
        return (
            <StyledMenuItem key={"0x"} value={""} disabled>
                <Typography
                    mt={0.1}
                    component={"span"}
                    sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "12px",
                    }}
                >
                    No Tokens Available
                </Typography>
            </StyledMenuItem>
        );
    }
};

const InactiveDollar = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="10" fill="#EFF0F2" />
        <path
            d="M12.852 11.684C12.852 10.244 11.76 9.68 10.176 9.296V6.728C10.8 6.86 11.412 7.196 11.94 7.676L12.636 6.764C11.964 6.176 11.172 5.744 10.176 5.636V4.892H9.168V5.624C7.752 5.804 6.768 6.776 6.768 8.024C6.768 9.392 7.716 9.932 9.168 10.316V12.992C8.388 12.836 7.752 12.452 7.188 11.912L6.456 12.812C7.188 13.508 8.088 13.964 9.168 14.096V14.888H10.176V14.12C11.916 14.012 12.852 12.992 12.852 11.684ZM8.004 7.916C8.004 7.364 8.472 6.848 9.168 6.704V9.032C8.4 8.78 8.004 8.492 8.004 7.916ZM10.176 13.052V10.568C11.148 10.832 11.628 11.144 11.628 11.804C11.628 12.404 11.136 12.968 10.176 13.052Z"
            fill="#ADB1BD"
        />
    </svg>
);

const HoverActiveDollarPrimary = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="10" fill="white" />
        <path
            d="M12.852 11.684C12.852 10.244 11.76 9.68 10.176 9.296V6.728C10.8 6.86 11.412 7.196 11.94 7.676L12.636 6.764C11.964 6.176 11.172 5.744 10.176 5.636V4.892H9.168V5.624C7.752 5.804 6.768 6.776 6.768 8.024C6.768 9.392 7.716 9.932 9.168 10.316V12.992C8.388 12.836 7.752 12.452 7.188 11.912L6.456 12.812C7.188 13.508 8.088 13.964 9.168 14.096V14.888H10.176V14.12C11.916 14.012 12.852 12.992 12.852 11.684ZM8.004 7.916C8.004 7.364 8.472 6.848 9.168 6.704V9.032C8.4 8.78 8.004 8.492 8.004 7.916ZM10.176 13.052V10.568C11.148 10.832 11.628 11.144 11.628 11.804C11.628 12.404 11.136 12.968 10.176 13.052Z"
            fill="#25274F"
        />
    </svg>
);

const HoverActiveDollar = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="#EFF0F2"
        />
        <path
            d="M12.852 11.684C12.852 10.244 11.76 9.68 10.176 9.296V6.728C10.8 6.86 11.412 7.196 11.94 7.676L12.636 6.764C11.964 6.176 11.172 5.744 10.176 5.636V4.892H9.168V5.624C7.752 5.804 6.768 6.776 6.768 8.024C6.768 9.392 7.716 9.932 9.168 10.316V12.992C8.388 12.836 7.752 12.452 7.188 11.912L6.456 12.812C7.188 13.508 8.088 13.964 9.168 14.096V14.888H10.176V14.12C11.916 14.012 12.852 12.992 12.852 11.684ZM8.004 7.916C8.004 7.364 8.472 6.848 9.168 6.704V9.032C8.4 8.78 8.004 8.492 8.004 7.916ZM10.176 13.052V10.568C11.148 10.832 11.628 11.144 11.628 11.804C11.628 12.404 11.136 12.968 10.176 13.052Z"
            fill="#25274F"
        />
    </svg>
);

const ActiveDollar = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="#2962EF"
        />
        <path
            d="M12.852 11.684C12.852 10.244 11.76 9.68 10.176 9.296V6.728C10.8 6.86 11.412 7.196 11.94 7.676L12.636 6.764C11.964 6.176 11.172 5.744 10.176 5.636V4.892H9.168V5.624C7.752 5.804 6.768 6.776 6.768 8.024C6.768 9.392 7.716 9.932 9.168 10.316V12.992C8.388 12.836 7.752 12.452 7.188 11.912L6.456 12.812C7.188 13.508 8.088 13.964 9.168 14.096V14.888H10.176V14.12C11.916 14.012 12.852 12.992 12.852 11.684ZM8.004 7.916C8.004 7.364 8.472 6.848 9.168 6.704V9.032C8.4 8.78 8.004 8.492 8.004 7.916ZM10.176 13.052V10.568C11.148 10.832 11.628 11.144 11.628 11.804C11.628 12.404 11.136 12.968 10.176 13.052Z"
            fill="white"
        />
    </svg>
);

const InActiveDollarPrimary = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="10" fill="white" />
        <path
            d="M12.852 11.684C12.852 10.244 11.76 9.68 10.176 9.296V6.728C10.8 6.86 11.412 7.196 11.94 7.676L12.636 6.764C11.964 6.176 11.172 5.744 10.176 5.636V4.892H9.168V5.624C7.752 5.804 6.768 6.776 6.768 8.024C6.768 9.392 7.716 9.932 9.168 10.316V12.992C8.388 12.836 7.752 12.452 7.188 11.912L6.456 12.812C7.188 13.508 8.088 13.964 9.168 14.096V14.888H10.176V14.12C11.916 14.012 12.852 12.992 12.852 11.684ZM8.004 7.916C8.004 7.364 8.472 6.848 9.168 6.704V9.032C8.4 8.78 8.004 8.492 8.004 7.916ZM10.176 13.052V10.568C11.148 10.832 11.628 11.144 11.628 11.804C11.628 12.404 11.136 12.968 10.176 13.052Z"
            fill="#A7AAB8"
        />
    </svg>
);

export const renderToken = ({
    disabled,
    fixedUsd,
    disabledFixUsd,
    setHoverState,
    handleChangeFixedUsd,
    hoverState,
    index = null,
    type,
    componentHover,
    componentActive,
}) => {
    if (disabled) {
        return (
            <span onMouseOver={() => setHoverState(true)}>
                <InactiveDollar />
            </span>
        );
    }

    if (fixedUsd) {
        if (disabledFixUsd) {
            return (
                <span>
                    <ActiveDollar />
                </span>
            );
        } else {
            return (
                <span
                    onMouseOut={() => setHoverState(false)}
                    onClick={() => handleChangeFixedUsd(false, index)}
                >
                    <ActiveDollar />
                </span>
            );
        }
    }
    if (hoverState) {
        if (type === "primary" && !(componentHover || componentActive)) {
            return (
                <Tooltip title="Enter Value in USD" placement="top">
                    <span
                        onMouseOut={() => setHoverState(false)}
                        onClick={() => handleChangeFixedUsd(true, index)}
                    >
                        <HoverActiveDollarPrimary />
                    </span>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="Enter Value in USD" placement="top">
                    <span
                        onMouseOut={() => setHoverState(false)}
                        onClick={() => handleChangeFixedUsd(true, index)}
                    >
                        <HoverActiveDollar />
                    </span>
                </Tooltip>
            );
        }
    }

    if (disabledFixUsd) {
        return (
            <span>
                <InactiveDollar />
            </span>
        );
    }

    if (type === "primary" && !(componentHover || componentActive)) {
        return (
            <span onMouseOver={() => setHoverState(true)}>
                <InActiveDollarPrimary />
            </span>
        );
    }
    return (
        <span onMouseOver={() => setHoverState(true)}>
            <InactiveDollar />
        </span>
    );
};
