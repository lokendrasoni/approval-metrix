import { useContext } from "react";
import ContributorContext from "src/contexts/ContributorContext";
import { ContributorContextTypes } from "src/contexts/types/ContributorContextTypes";

export default function ContributorHome() {
    const { wallet } = useContext(ContributorContext) as ContributorContextTypes;
    return <div>{wallet}</div>;
}
