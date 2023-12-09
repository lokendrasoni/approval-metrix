import { useContext, useState } from "react";
import { ZERO_ADDRESS } from "src/constants/address";
import { SafeTransactionOptionalProps } from "@safe-global/protocol-kit";
import { MetaTransactionData, SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { getAddress } from "ethers";
import { getTokenContractAddress } from "mapping/tokenAddress";

import SafeContext from "src/contexts/SafeContext";

import { getNextNonce } from "src/helpers/gnosis/getNextNonce";

import { SafeContextTypes } from "src/contexts/types/SafeContextTyes";
import useERC20Contract from "./useERC20Contract";
import fetchJSON from "src/queries/fetchJSON";
function useMultisigTransaction(safeAddress, networkId) {
    const { safeSdk, safeService, safeAuthSignInResponse } = useContext(
        SafeContext,
    ) as SafeContextTypes;
    const [loading, setLoading] = useState(false);

    const { ERC20Contract } = useERC20Contract();

    // function timeout(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // const { mutateAsync: pushTransaction } = usePushTxnToBiconomy(currentSafeAddress, 5);

    const getERC20Contract = (contractAddress, customToken) => {
        // console.log(customToken);
        if (contractAddress && customToken) {
            return customToken.attach(contractAddress);
        }
        return customToken;
    };

    const createMultisigTransaction = async ({
        payouts,
    }: {
        payouts: Array<{
            tokenAddress: string;
            to: string;
            amount: string;
            decimals: number;
            inWei: boolean;
        }>;
    }): Promise<{ safeTransaction: SafeTransaction; safeTransactionHash: string }> => {
        try {
            setLoading(true);
            console.log("safeSdk", safeSdk);

            const safeTransactionData: MetaTransactionData[] = payouts?.map(
                ({ tokenAddress, to, decimals, amount, inWei }) => {
                    if (
                        tokenAddress?.toLowerCase() == "gETH" ||
                        getTokenContractAddress(tokenAddress) == ZERO_ADDRESS
                    ) {
                        return {
                            to: getAddress(to),
                            value: amount,
                            data: "0x",
                            operation: 0,
                        };
                    } else {
                        const erc20 = getERC20Contract(tokenAddress, ERC20Contract);

                        if (!erc20) {
                            throw new Error("ERC20 token undefined");
                        }
                        let decimalsCalc = decimals;
                        return {
                            to: tokenAddress,
                            value: "0",
                            operation: 0,
                            data: erc20.interface.encodeFunctionData("transfer", [
                                getAddress(to),
                                amount,
                            ]) as string,
                        };
                    }
                },
            );

            // const safeVersion = await safeSdk?.getContractVersion();
            // console.log("safeVersion", safeVersion);

            const nonce = await getNextNonce(safeAddress, networkId, safeService, safeSdk);
            console.log("nonce", nonce);
            const options: SafeTransactionOptionalProps = {
                // safeTxGas //Optional
                // baseGas, // Optional
                // gasPrice, // Optional
                // gasToken, // Optional
                // refundReceiver, // Optional
                nonce,
                // Optional
            };

            console.log("safeTransactionData", safeTransactionData);
            const safeTransaction = await safeSdk?.createTransaction({
                transactions: safeTransactionData,
                // onlyCalls: safeVersion === "1.1.1",
                options,
            });

            const safeTransactionHash = await safeSdk.getTransactionHash(safeTransaction);

            return { safeTransaction, safeTransactionHash };
        } catch (error) {
            alert("Something went wrong");
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddConfirmation = async (
        safeTransaction: SafeTransaction,
        safeTransactionHash: string,
    ): Promise<void> => {
        try {
            setLoading(true);
            const threshold = await safeSdk?.getThreshold();
            // will not execute Transaction By Default
            if (threshold && threshold > 0) {
                const safeTransactionSigned: SafeTransaction = await safeSdk?.signTransaction(
                    safeTransaction,
                    "eth_signTypedData_v4",
                );
                const signature = safeTransactionSigned.signatures.get(
                    safeAuthSignInResponse?.eoa?.toLowerCase(),
                )?.data;

                console.log("signature", signature);

                const urlToPostTransaction = `https://safe-transaction-goerli.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/`;

                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        ...safeTransaction.data,
                        sender: safeAuthSignInResponse?.eoa,
                        contractTransactionHash: safeTransactionHash,
                        signature: signature,
                    }),
                };

                await fetchJSON(urlToPostTransaction, options);

                // await safeService.proposeTransaction({
                //     safeAddress,
                //     safeTransactionData: safeTransaction.data,
                //     safeTxHash: safeTransactionHash,
                //     senderAddress: safeAuthSignInResponse?.eoa,
                //     senderSignature: signature,
                // });
                // await safeService.confirmTransaction(safeTransactionHash, signature);
            } else {
                throw new Error("Unable to create Transaction");
            }
        } catch (err) {
            alert("Something went wrong");
            console.log("error", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Execute transaction on safe
    // const handleExecution = async (safeTransactionHash, nonce): Promise<string> => {
    //     try {
    //         const transaction = await safeService.getTransaction(safeTransactionHash);

    //         console.log({ transaction });
    //         const safeTransactionData: any = {
    //             to: getAddress(transaction.to),
    //             value: transaction.value,
    //             data: transaction.data ?? "0x",
    //             operation: transaction.operation,
    //             safeTxGas: transaction.safeTxGas,
    //             baseGas: transaction.baseGas,
    //             gasPrice: transaction.gasPrice,
    //             gasToken: transaction.gasToken,
    //             refundReceiver: transaction.refundReceiver,
    //             nonce: transaction.nonce,
    //         };

    //         // Check if transaction is executable
    //         const isExecutableRes = await isExecutable(nonce);
    //         console.log({ isExecutableRes });

    //         // Calculate fee data
    //         await library.getFeeData();
    //         const preValidateSignature = generatePreValidatedSignature(account);
    //         const gasEstimationResult = await getGasEstimateTransactionExecution(
    //             transaction?.data,
    //             preValidateSignature?.data,
    //         );
    //         const gasLimit = gasEstimationResult + 21000;
    //         console.log({ preValidateSignature, gasEstimationResult, gasLimit });

    //         // Creating data for biconomy proxy API
    //         const {
    //             to,
    //             data,
    //             value,
    //             operation,
    //             safeTxGas: safeTxGasSdk,
    //             gasPrice,
    //             gasToken,
    //             baseGas: baseGasSdk,
    //             refundReceiver,
    //         } = safeTransactionData;

    //         const combinedSignature = transaction.confirmations
    //             .sort((a, b) => (a.owner.toLowerCase() > b.owner.toLowerCase() ? 1 : -1))
    //             .reduce((prev, item) => (prev += item.signature.replace("0x", "")), "0x");

    //         console.log({ combinedSignature });

    //         const params = {
    //             from: safeAddress,
    //             to: safeAddress,
    //             params: [
    //                 to,
    //                 value,
    //                 data,
    //                 operation,
    //                 safeTxGasSdk,
    //                 baseGasSdk,
    //                 gasPrice,
    //                 gasToken,
    //                 refundReceiver,
    //                 combinedSignature,
    //             ],
    //             gasLimit,
    //         };
    //         console.log({ params });

    //         let pushTxnResponse = await pushTransaction({ params });

    //         console.log({ pushTxnResponse });

    //         if (!pushTxnResponse?.success) {
    //             throw new Error("Error while pushing transaction to biconomy");
    //         }
    //         return pushTxnResponse.txHash;
    //     } catch (error) {
    //         throw new Error("Error in execution transaction");
    //     }
    // };

    return {
        handleAddConfirmation,
        createMultisigTransaction,

        loading,
    };
}

export default useMultisigTransaction;
