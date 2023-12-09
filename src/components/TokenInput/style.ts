import styled from "@emotion/styled";
import { MenuItem, Select, TextField } from "@mui/material";
import { TokenInputProps } from "./types";

export const ComponentWrapper: any = styled.div`
    width: 100%;
`;
export const StyledInputField: any = styled(TextField)`
    &.MuiTextField-root {
        display: flex;
        .MuiOutlinedInput-root {
            height: ${(props: TokenInputProps) => {
                if (props.size === "large") {
                    return "40px";
                }

                if (props.size === "regular") {
                    return "32px";
                }
            }};

            font-size: ${(props: TokenInputProps) => {
                if (props.size === "large") {
                    return "14px";
                }

                if (props.size === "regular") {
                    return "12px";
                }
            }};
            font-weight: 500;
            line-height: ${(props: TokenInputProps) => {
                if (props.size === "large") {
                    return "21px";
                }

                if (props.size === "regular") {
                    return "18px";
                }
            }};

            padding: 8px 10px;
            background: ${(props: TokenInputProps) => {
                if (props.disabled) return "white";
                if (props.varianttype === "primary") return "white";
                if (props.varianttype === "secondary") return "white";
            }};

            border: ${(props: TokenInputProps) => {
                if (props.disabled) {
                    return "none";
                }
                if (props.varianttype === "secondary") {
                    return `1px solid black`;
                }
                if (props.varianttype === "error") {
                    return `1px solid red`;
                } else {
                    return "none";
                }
            }};

            border: ${(props: TokenInputProps) => {
                if (props.active) {
                    if (props.varianttype === "primary") return "white";
                } else {
                    if (props.hover) {
                        if (props.disabled) {
                            return "none";
                        }
                        if (props.varianttype === "secondary" || props.varianttype === "primary") {
                            return `1px solid black`;
                        }
                        if (props.varianttype === "error") {
                            return `1px solid red`;
                        } else {
                            return "none";
                        }
                    }
                }
            }};

            background: ${(props: TokenInputProps) => {
                if (props.active) {
                    if (props.varianttype === "error") {
                        return `1px solid red !important`;
                    }
                    if (props.varianttype === "primary") return "white";
                    return `1px solid blue !important`;
                } else {
                    if (props.hover) {
                        if (props.varianttype === "primary") return "white";
                    }
                }
            }};

            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-right: none;
            border-left: none;
            &.Mui-focused {
                border: ${(props: TokenInputProps) => {
                    if (props.varianttype === "error") {
                        return `1px solid red`;
                    } else {
                        return `1px solid blue`;
                    }
                }};

                border-right: none;
                border-left: none;
            }

            .MuiOutlinedInput-input,
            .MuiInputBase-input {
                font-size: ${(props: TokenInputProps) => {
                    if (props.size === "large") {
                        return "14px";
                    }

                    if (props.size === "regular") {
                        return "12px";
                    }
                }};
                font-weight: 500;
                line-height: 21px;
                padding: 0px;
            }
        }

        .MuiOutlinedInput-notchedOutline {
            border: none;
        }
    }
`;

export const StyledSelect: any = styled(Select)`
    &.MuiOutlinedInput-root {
        height: ${(props: TokenInputProps) => {
            if (props.size === "large") {
                return "40px";
            }

            if (props.size === "regular") {
                return "32px";
            }
        }};
        width: 100%;
        background-color: white;
        outline: none;
        padding: 8px 0px;

        background: ${(props: TokenInputProps) => {
            // if (props.disabled) return "white";
            if (props.type === "primary") return "white";
            if (props.type === "secondary") return "white";
        }};

        border: ${(props: TokenInputProps) => {
            // if (props.disabled) {
            //     return "none";
            // }
            if (props.type === "secondary") {
                return `1px solid black`;
            }
            if (props.type === "error") {
                return `1px solid red`;
            } else {
                return "none";
            }
        }};

        border: ${(props: TokenInputProps) => {
            if (props.active) {
                if (props.type === "error") {
                    return `1px solid red !important`;
                }
                return `1px solid blue !important`;
            } else {
                if (props.hover) {
                    // if (props.disabled) {
                    //     return "none";
                    // }
                    if (props.type === "secondary" || props.type === "primary") {
                        return `1px solid black`;
                    }
                    if (props.type === "error") {
                        return `1px solid red`;
                    } else {
                        return "none";
                    }
                }
            }
        }};

        background: ${(props: TokenInputProps) => {
            if (props.active) {
                return `${"white"} !important`;
            } else {
                if (props.hover) {
                    // if (props.disabled) {
                    //     return "white";
                    // }
                    if (props.type === "primary") return "white";
                }
            }
        }};

        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: none !important;

        .MuiSvgIcon-root {
            display: ${(props: TokenInputProps) => {
                if (props.disabled) {
                    return `none`;
                } else {
                    return "inline-flex";
                }
            }};
        }
        .MuiSelect-select {
            padding-right: ${(props: TokenInputProps) => {
                if (props.disabled) {
                    return `12px`;
                } else {
                    return "32px";
                }
            }};
        }
    }

    .MuiInputBase-input {
        font-size: 14px;
        font-weight: 500;
        line-height: 12px;
        padding: 0;

        img {
            vertical-align: middle;
        }
    }
    .MuiOutlinedInput-input {
        outline: none;
        font-size: 12px;
        line-height: 12px;
        font-weight: 500;
    }
    .MuiOutlinedInput-notchedOutline {
        border: none;
    }
`;

export const DollarContainer: any = styled.div`
    width: ${(props: any) => (props.isNonFixedUSD ? "40px" : "45px")};

    height: ${(props: TokenInputProps) => {
        if (props.size === "large") {
            return "40px";
        }

        if (props.size === "regular") {
            return "32px";
        }
    }};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props: any) => (props.isNonFixedUSD ? "10px" : "12px")};
    padding-right: ${(props: any) => props.isNonFixedUSD && "0px"};

    background: ${(props: TokenInputProps) => {
        if (props.disabled) return "white";
        if (props.active) return "white";
        if (props.hover) return "white";
        if (props.type === "primary") return "white";
        if (props.type === "secondary") return "white";
    }};

    border-width: 1px 0px 1px 1px;

    border: ${(props: TokenInputProps) => {
        if (props.disabled) {
            return `0px solid black`;
        }
        if (props.type === "primary") {
            return `0px solid black`;
        }
        if (props.type === "secondary") {
            return `1px solid black`;
        }
        if (props.type === "error") {
            return `1px solid red`;
        } else {
            return "none";
        }
    }};

    border-style: solid;
    border-right: ${(props: TokenInputProps) => {
        if (props.disabled) {
            return `0px solid black`;
        }
        if (props.type === "primary") {
            return `0px solid black`;
        }
        if (props.type === "secondary") {
            return `1px solid black`;
        }
        if (props.type === "error") {
            return `1px solid red`;
        } else {
            return "none";
        }
    }};

    border: ${(props: TokenInputProps) => {
        if (props.active) {
            if (props.type === "error") {
                return `1px solid red !important`;
            }
            return `1px solid blue !important`;
        } else {
            if (props.hover) {
                if (props.disabled) {
                    return `0px 1px 0px 0px solid black`;
                }
                if (props.type === "secondary" || props.type === "primary") {
                    return `1px solid black`;
                }
                if (props.type === "error") {
                    return `1px solid red`;
                } else {
                    return "none";
                }
            }
        }
    }};

    border-right: ${(props: any) => props.isNonFixedUSD && "0px solid !important"};

    border-radius: 4px 0px 0px 4px;

    cursor: pointer;
    > span {
        height: 20px;
    }
`;

export const StyledMenuItem: any = styled(MenuItem)`
    &.MuiMenuItem-root {
        height: 30px;
        &:hover {
            background-color: white;
        }
        border-bottom: ${(props: TokenInputProps) => props.seperator && `1px solid grey`};
        &:last-child {
            border-bottom: none;
        }
    }
    &.Mui-selected {
        background-color: blue;
    }
    &.Mui-focusVisible {
        background-color: white;
    }
`;
