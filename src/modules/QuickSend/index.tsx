import { useContext } from "react";
import SafeContext from "src/contexts/SafeContext";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import { useGetSafeContributors } from "src/queries/safes/api";

export default function QuickSend() {
    const { safeAddress, safeAuthSignInResponse } = useContext(SafeContext) as SafeContextTypes;
    const { data } = useGetSafeContributors({
        headers: {
            "x-par-safe-address": safeAddress,
            "x-par-network-id": 5,
            "x-par-wallet-address": safeAuthSignInResponse?.eoa,
        },
    });
    return <></>;
}
