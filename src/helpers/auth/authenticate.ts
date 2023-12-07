export const authenticate = async (account, library, connector, AUTH_MSG) => {
    if (!!account && !!library) {
        //handleAuthenticating(true);
        try {
            if (connector?.name === "WalletConnect") {
                return await connector?.provider?.wc
                    ?.signPersonalMessage([AUTH_MSG, account])
                    .then(async signature => {
                        // console.log("signature", signature);
                        if (connector?.provider?.walletMeta?.name === "Argent") {
                            return {
                                success: true,
                                signature,
                                isArgent: true,
                                gnosisMultisig: false,
                            };
                        }

                        if (connector?.provider?.walletMeta?.name === "Gnosis Safe Multisig") {
                            return {
                                success: true,
                                signature,
                                isArgent: false,
                                gnosisMultisig: true,
                            };
                        }
                        return {
                            success: true,
                            signature,
                            isArgent: false,
                            gnosisMultisig: false,
                        };
                    })
                    .catch(error => {
                        // console.log(error);
                        return false;
                    });
            } else {
                return await library
                    .getSigner(account)
                    .signMessage(AUTH_MSG)
                    .then(signature => {
                        return {
                            success: true,
                            signature,
                            isArgent: false,
                            gnosisMultisig: false,
                        };
                        //   authenticateWallet(signature, account)
                        //     .then(result => {
                        //       authenticationSuccess(signature, result);
                        //     })
                        //     .catch(error => {
                        //       authenticationFailure(error);
                        //     });
                    })
                    .catch(error => {
                        // console.log(error);
                        return false;
                        //   authenticationFailure(error);
                    });
            }
        } catch (error) {
            // console.log(error);
            return false;
            // authenticationFailure(error);
        }
    }
};
