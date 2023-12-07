interface TokenData {
    tokenAddress: string;
    tokenSymbol: string;
    decimals: number;
    tokenLogoUrl: string;
    tokenName: string;
}

// accept invoice and return token data
// if token data is not present in invoice then return token data from deal data
// if preferDealData is true then return token data from deal data even if token data is present in invoice
export const getTokenData = (invoice: any, dealData: any, preferDealData = false): TokenData => {
    const tokenAddress =
        invoice?.lineItems?.[0]?.tokenAddress && !preferDealData
            ? invoice?.lineItems[0]?.tokenAddress
            : dealData?.dealType === "fixed-recurring"
            ? dealData?.fixedRecurringPayouts?.tokenAddress
            : dealData?.payAsYouGoPayouts?.tokenAddress;

    const tokenSymbol =
        invoice?.lineItems?.[0]?.tokenSymbol && !preferDealData
            ? invoice?.lineItems[0]?.tokenSymbol
            : dealData?.dealType === "fixed-recurring"
            ? dealData?.fixedRecurringPayouts?.tokenSymbol
            : dealData?.payAsYouGoPayouts?.tokenSymbol;
    const decimals =
        invoice?.lineItems?.[0]?.decimals != undefined && !preferDealData
            ? invoice?.lineItems[0]?.decimals
            : dealData?.dealType === "fixed-recurring"
            ? dealData?.fixedRecurringPayouts?.decimals
            : dealData?.payAsYouGoPayouts?.decimals;
    const tokenLogoUrl =
        invoice?.lineItems?.[0]?.tokenLogoUrl && !preferDealData
            ? invoice?.lineItems[0]?.tokenLogoUrl
            : dealData?.dealType === "fixed-recurring"
            ? dealData?.fixedRecurringPayouts?.tokenLogoUrl
            : dealData?.payAsYouGoPayouts?.tokenLogoUrl;
    const tokenName =
        invoice?.lineItems?.[0]?.tokenName && !preferDealData
            ? invoice?.lineItems[0]?.tokenName
            : dealData?.dealType === "fixed-recurring"
            ? dealData?.fixedRecurringPayouts?.tokenName
            : dealData?.payAsYouGoPayouts?.tokenName;

    const tokenData = {
        tokenAddress,
        tokenSymbol,
        decimals,
        tokenLogoUrl,
        tokenName,
    };

    return tokenData;
};
