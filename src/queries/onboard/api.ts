import { useQuery } from "react-query";
import {
    LOGIN,
    LOGIN_URL,
    LOGOUT_URL,
} from "../constants";
import fetchJSON from "../fetchJSON";

export function useLoginV3api(
    { signedMessage, walletAddress, networkId, isArgent, message, rememberLogin }: any,
    options: {},
) {
    return useQuery(
        LOGIN,
        async () =>
            await fetchJSON(LOGIN_URL, {
                method: "POST",
                body: JSON.stringify({
                    signedMessage,
                    walletAddress,
                    networkId,
                    isArgent,
                    message,
                    rememberLogin,
                }),
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                mode: "cors",
            }),
        {
            ...options,
        },
    );
}

export function useLogoutV3api(options: {}) {
    return useQuery(
        "clearcookie-v3",
        async () =>
            await fetchJSON(LOGOUT_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                mode: "cors",
            }),
        {
            ...options,
        },
    );
}
