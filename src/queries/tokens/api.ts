import { useQuery } from "react-query";
import { GET_TOKENS_BY_SAFE } from "../constants";
import fetchJSON from "../fetchJSON";

import { getAddress } from "ethers";

export function useGetTokensAndPriceBySafe(gnosisURL, safeAddress, options = {}) {
    return useQuery(
        [GET_TOKENS_BY_SAFE, safeAddress],
        async () => {
            return await fetchJSON(
                `${gnosisURL}/safes/${getAddress(
                    safeAddress,
                )}/balances/usd/?trusted=false&exclude_spam=false`,
                {},
            );
        },
        { enabled: Boolean(safeAddress), ...options },
    );
}
