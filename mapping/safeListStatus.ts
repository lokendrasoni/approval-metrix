export const SafeListStatus = status => {
    switch (status) {
        case "signed-up":
            return "signed-up";

        case "pending":
            return "transaction-pending";

        default:
            return "";
    }
};
