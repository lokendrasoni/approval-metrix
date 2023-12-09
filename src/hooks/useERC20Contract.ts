import { useContext } from "react";
// import { useWeb3React } from "@web3-react/core";
import ERC20ABI from "src/constants/abis/ERC20.json";
import { ZERO_ADDRESS } from "src/constants/address";
import useContract from "./useContract";
import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import SafeContext from "src/contexts/SafeContext";
export default function useERC20Contract() {
    const { provider, account }: any = useContext(SafeContext) as SafeContextTypes;

    const ERC20Contract = useContract(ZERO_ADDRESS, ERC20ABI, true, provider, account);

    return {
        ERC20Contract,
    };
}
