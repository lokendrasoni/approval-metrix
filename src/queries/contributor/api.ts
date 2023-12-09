import { useQuery } from "react-query";
import { CONTRIBUTOR_GET_SAFES, CONTRIBUTOR_GET_SAFES_ENDPOINT } from "../constants";
import fetchJSON from "../fetchJSON";
export function useCheckAuth(options = {}) {
    return useQuery(
        [CONTRIBUTOR_GET_SAFES],
        async () =>
            await fetchJSON(`${CONTRIBUTOR_GET_SAFES_ENDPOINT}`, {
                method: "GET",
                headers: {
                    credentials: "include",
                    "content-type": "application/json",
                },
            }),
        {
            ...options,
        },
    );
}
