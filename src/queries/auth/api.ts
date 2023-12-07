import { useQuery } from "react-query";
import { ME, ME_ENDPOINT } from "../constants";
import fetchJSON from "../fetchJSON";
export function useCheckAuth(options = {}) {
    return useQuery(
        [ME],
        async () =>
            await fetchJSON(`${ME_ENDPOINT}`, {
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
