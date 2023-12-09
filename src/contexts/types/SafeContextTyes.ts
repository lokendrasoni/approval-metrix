import { AuthKitSignInData } from "@safe-global/auth-kit";
import { Dispatch, SetStateAction } from "react";

// @types.Contributor.ts
export type SafeContextTypes = {
    safeAddress: string;
    setSafeAddress: Function;
    safeAuthSignInResponse: AuthKitSignInData;
    setSafeAuthSignInResponse: Dispatch<SetStateAction<AuthKitSignInData | null>>;
    tokensInSafe: any;
};
