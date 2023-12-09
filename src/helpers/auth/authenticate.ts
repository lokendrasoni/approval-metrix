import RPC from "utils/ethersRPC";

export const authenticate = async (account, library, AUTH_MSG) => {
    if (!!account && !!library) {
        try {
            const rpc = new RPC(library);
            const signedMessage = await rpc.signMessage(AUTH_MSG);

            return signedMessage;
        } catch (error) {
            // console.log(error);
            return false;
            // authenticationFailure(error);
        }
    }
};
