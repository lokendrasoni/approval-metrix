import { useQuery } from "react-query";
import { GET_SAFE_CONTRIBUTORS, GET_SAFE_CONTRIBUTORS_ENDPOINT } from "../constants";
import fetchJSON from "../fetchJSON";
export function useGetSafeContributors(options = {}) {
    return useQuery(
        [GET_SAFE_CONTRIBUTORS],
        async () =>
            await fetchJSON(`${GET_SAFE_CONTRIBUTORS_ENDPOINT}`, {
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
