import { useMemo } from "react";
// import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

export default function useContract(address, ABI, withSigner = false, library, account) {
    try {
        return useMemo(
            () =>
                !!address && !!ABI && !!library
                    ? new Contract(
                          address,
                          ABI,
                          withSigner ? library?.getSigner(account).connectUnchecked() : library,
                      )
                    : undefined,
            [address, ABI, withSigner, library, account],
        );
    } catch (err) {
        return undefined;
    }
}
