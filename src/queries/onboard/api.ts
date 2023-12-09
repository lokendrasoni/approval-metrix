import { useQuery } from "react-query";
import { LOGIN, LOGIN_URL, LOGOUT_URL } from "../constants";
import fetchJSON from "../fetchJSON";

export function useLoginapi(
    { signedMessage, walletAddress, networkId, isArgent, message, rememberLogin, email }: any,
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
                    email,
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

export function useLogoutapi(options: {}) {
    return useQuery(
        "clearcookie",
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
