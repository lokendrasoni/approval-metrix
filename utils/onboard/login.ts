import { ethers } from "ethers";

const argentABI = [
    "function isValidSignature(bytes32 _message, bytes _signature) public view returns (bool)",
];

export const verifyArgent = async (
    walletAddress: string,
    signedMessage: string,
    hashMessage: string,
) => {
    const INFURA_TOKEN = process.env.NEXT_PUBLIC_INFURA_TOKEN;
    const url = `https://mainnet.infura.io/v3/${INFURA_TOKEN}`;
    const provider = new ethers.providers.JsonRpcProvider(url);

    const argentWallet = new ethers.Contract(walletAddress, argentABI, provider);
    try {
        const returnValue = await argentWallet.isValidSignature(hashMessage, signedMessage);
        return returnValue;
    } catch (error) {
        // signature is not valid
        console.log("error", error);
        return false;
    }
};
