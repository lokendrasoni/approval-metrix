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
function useMultisigTransaction(safeAddress, networkId) {
    const {
        safeSdk,
        safeAddress: currentSafeAddress,

        safeService,
    } = useContext(SafeContext) as SafeContextTypes;

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

    async function checkOnGnosis(safeTnxHash) {
        console.log({ safeTnxHash });
        return await new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                // Get Safe transaction details
                const tx = await getSafeTransactionDetails(gnosisApiEndpoint, safeTnxHash);
                console.log({
                    isExecuted: tx?.isExecuted,
                    isSuccesful: tx?.isSuccessful,
                });

                // Check IF transaction was executed
                if (tx?.isExecuted) {
                    // IF is failed, show error modal ELSE succcess modal
                    if (!tx?.isSuccessful) {
                        reject({ message: "Execution error" });
                    } else {
                        resolve(true);
                    }
                    setTimeout(() => {
                        clearInterval(interval);
                    }, 2000);
                }
            }, 3000);
        });
    }

    const isExecutable = async currentNonce => {
        const nonce = await safeSdk?.getNonce();
        return {
            canExecute: nonce == currentNonce,
            nonceToExecute: nonce,
        };
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
            console.log("safeSdk", safeSdk);

            const safeTransactionData: MetaTransactionData[] = payouts?.map(
                ({ tokenAddress, to, decimals, amount, inWei }) => {
                    if (
                        tokenAddress?.toLowerCase() == "gETH" ||
                        getTokenContractAddress(tokenAddress) == ZERO_ADDRESS
                    ) {
                        return {
                            to: getAddress(to),
                            value: inWei ? amount : stringNumberToWei(amount, decimals || 18),
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
                                inWei ? amount : stringNumberToWei(amount, decimalsCalc),
                            ]) as string,
                        };
                    }
                },
            );

            // const safeVersion = await safeSdk?.getContractVersion();
            // console.log("safeVersion", safeVersion);

            const nonce = await getNextNonce(safeAddress, networkId, safeService, safeSdk);
            const options: SafeTransactionOptionalProps = {
                // safeTxGas //Optional
                // baseGas, // Optional
                // gasPrice, // Optional
                // gasToken, // Optional
                // refundReceiver, // Optional
                nonce,
                // Optional
            };

            const safeTransaction = await safeSdk?.createTransaction({
                transactions: safeTransactionData,
                // onlyCalls: safeVersion === "1.1.1",
                options,
            });

            const safeTransactionHash = await safeSdk.getTransactionHash(safeTransaction);

            return { safeTransaction, safeTransactionHash };
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleAddConfirmation = async (
        safeTransaction: SafeTransaction,
        safeTransactionHash: string,
        setText = null,
        sourceModule,
        count = 0,
    ): Promise<void> => {
        try {
            const threshold = await safeSdk?.getThreshold();
            // will not execute Transaction By Default
            if (threshold && threshold > 0) {
                setText ? setText("Please check your wallet to proceed") : null;
                const safeTransactionSigned: SafeTransaction = await safeSdk?.signTransaction(
                    safeTransaction,
                    "eth_signTypedData_v4",
                );
                const signature = safeTransactionSigned.signatures.get(""?.toLowerCase())?.data;
                setText
                    ? sourceModule == "expense"
                        ? setText(`Adding your approval to the batch of ${count} expense(s)`)
                        : setText("Approving payment...")
                    : null;

                await safeService.proposeTransaction({
                    safeAddress,
                    safeTransactionData: safeTransaction.data,
                    safeTxHash: safeTransactionHash,
                    senderAddress: "",
                    senderSignature: signature,
                });
                await safeService.confirmTransaction(safeTransactionHash, signature);
            } else {
                throw new Error("Unable to create Transaction");
            }
        } catch (err) {
            throw err;
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
        checkOnGnosis,
    };
}

export default useMultisigTransaction;
