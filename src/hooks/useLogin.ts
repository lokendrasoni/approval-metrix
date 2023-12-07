import { useState } from "react";
import { generateNonce, SiweMessage } from "siwe";
import { authenticate } from "src/helpers/auth/authenticate";
const useLoginV3 = () => {
    const [loadingSign, setLoadingSign] = useState(false);

    const handleAuth = async ({
        account,
        chainIdDecimal,
        provider,
        setSignedMessage,
        setMessage,
        connector,
        disconnect,
        setCallLogin,
        callLogin,
    }) => {
        setLoadingSign(true);
        const siwemessage = new SiweMessage({
            domain: window.location.host,
            address: account,
            statement: process.env.NEXT_PUBLIC_AUTH_MSG,
            uri: window.location.origin,
            version: "1",
            chainId: chainIdDecimal,
            nonce: generateNonce(),
        });

        const generateMessage = () => {
            setMessage(siwemessage);
            return siwemessage.prepareMessage();
        };

        const data = await authenticate(account, provider, connector, generateMessage());

        if (!!data) {
            setSignedMessage(data?.signature);
            if (!callLogin) {
                setCallLogin(true);
            }
        } else {
            if (account) {
                await disconnect(connector);
            }
        }
        setLoadingSign(false);
    };

    const triggerLogin = ({
        account,
        chainIdDecimal,
        provider,
        setSignedMessage,
        setMessage,
        connector,
        disconnect,
        setCallLogin,
        callLogin,
    }) => {
        handleAuth({
            account,
            chainIdDecimal,
            provider,
            setSignedMessage,
            setMessage,
            connector,
            disconnect,
            setCallLogin,
            callLogin,
        });
    };

    return {
        triggerLogin,
        handleAuth,
        loadingSign,
    };
};

export default useLoginV3;
