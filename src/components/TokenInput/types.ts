import { ThemeOptions } from "@mui/material/styles";

type TokenInputOptionsProps = {
    name?: string;
    symbol?: string;
    logoUri?: string | null;
    decimals?: number;
    tokenAddress?: string;
    fiatConversion?: string | number;
};

type TokensInSafeProps = {
    (key: string): {
        name?: string;
        symbol?: string;
        logoUri?: string | null;
        decimals: number;
        tokenAddress: string;
        fiatConversion: string | number;
    };
};
export interface TokenInputProps {
    uniqueTokensRequested?: any;
    index?: number;
    amount: string;
    options: TokenInputOptionsProps[];
    handleAmountChange: (...args) => void;
    token: string;
    handleTokenChange: (...args) => void;
    componentStyles?: any;
    disabled?: boolean;
    tokensInSafe: TokensInSafeProps | {};
    menuLeftMargin?: number;
    menuTopMargin?: number;
    label?: string;
    required?: boolean;
    disableTokenChange?: boolean;
    type?: "primary" | "secondary" | "error";
    size?: "large" | "regular";
    helperText?: string;
    getSelectedOption?(...arg): void;
    infoText?: string;
    theme?: ThemeOptions;
    seperator?: boolean;
    selectedItemsText?: string;
    placeholder?: string;
    active?: boolean;
    hover?: boolean;
    varianttype?: string;
    doNotShowDuplicateOption?: boolean;
    isNonFixedUSD?: boolean;
}
