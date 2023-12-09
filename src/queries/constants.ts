//ENDPOINTS
export const ME_ENDPOINT = "/api/me";
export const LOGIN_URL = `/api/auth/login`;
export const LOGOUT_URL = `/api/auth/logout`;
export const CONTRIBUTOR_GET_SAFES_ENDPOINT = `/api/contributor/getSafes`;
export const SET_SAFE_CONTRIBUTORS_ENDPOINT = `/api/save-contributor-and-send-invite`;
export const GET_SAFE_CONTRIBUTORS_ENDPOINT = `/api/getSafeContributor`;

//QUERY_NAME
export const LOGIN = "login";
export const ME = "me";
export const CONTRIBUTOR_GET_SAFES = "contributor-get-safes";
export const CONTRIBUTOR_SET_SAFES = "contributor-set-safes";
export const GET_SAFE_CONTRIBUTORS = "get-safes-contributors";

// Whitelisted token constants
// USD 1, AUD 1.58 and EURO 0.95
export const WHITELISTED_TOKENS = {
    "0xEAFFD40B5c50aF6373F46632C1B13BB537b5b7B8": {
        address: "0xEAFFD40B5c50aF6373F46632C1B13BB537b5b7B8",
        logoURI:
            "https://safe-transaction-assets.safe.global/tokens/logos/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.png",
        fiatValue: 1,
        fiatValues: {
            usd: 1,
            aud: 1.58,
            eur: 0.95,
            // inr: 0,
        },
    },
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F": {
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        logoURI:
            "https://safe-transaction-assets.safe.global/tokens/logos/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.png",
        fiatValue: 1,
        fiatValues: {
            usd: 1,
            aud: 1.58,
            eur: 0.95,
            // inr: 0,
        },
    },
};
