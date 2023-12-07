import fortmaticModule from "@web3-onboard/fortmatic";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import trezorModule from "@web3-onboard/trezor";
import { supportedChains } from "src/constants/supportedNetwork";

// Replace with your DApp's Infura ID

const dappId = process.env.NEXT_PUBLIC_DAPP_ID;

const injected = injectedModule();

const fortmatic = fortmaticModule({
    apiKey: "pk_test_886ADCAB855632AA",
});

// const ledger = ledgerModule();

const trezorOptions = {
    email: "test@test.com",
    appUrl: "https://www.blocknative.com",
};

const trezor = trezorModule(trezorOptions);

export const initWeb3Onboard = init({
    wallets: [injected, trezor, fortmatic],
    chains: [
        ...supportedChains.map(({ id, token, label, rpcUrl }) => {
            return {
                id,
                token,
                label,
                rpcUrl,
            };
        }),
    ],

    apiKey: dappId,
    appMetadata: {
        name: "Approval Metrix",
        description: "Approval Metrix",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
            { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        ],
        explore: "#",
    },
    // i18n: {
    //     en: {
    //         connect: {
    //             selectingWallet: {
    //                 header: "Parcel Payment OS for Contributor Economy",
    //                 sidebar: {
    //                     heading: "Parcel Custom Text Here DS",
    //                     subheading: "subheading custom DS",
    //                     paragraph: "This is the custom paragraph to be change later DS",
    //                 },
    //                 recommendedWalletsPart1: "",
    //                 recommendedWalletsPart2: "",
    //                 installWallet: "",
    //                 agreement: {
    //                     agree: "",
    //                     terms: "",
    //                     and: "",
    //                     privacy: "",
    //                 },
    //             },
    //             connectingWallet: {
    //                 header: "Parcel Connecting",
    //                 sidebar: {
    //                     subheading: "",
    //                     paragraph: "",
    //                 },
    //                 mainText: "",
    //                 paragraph: "",
    //                 previousConnection: "",
    //                 rejectedText: "",
    //                 rejectedCTA: "",
    //                 primaryButton: "",
    //             },
    //             connectedWallet: {
    //                 header: "Parcel Connected",
    //                 sidebar: {
    //                     subheading: "",
    //                     paragraph: "",
    //                 },
    //                 mainText: "",
    //             },
    //         },
    //     },
    // },
    accountCenter: {
        desktop: {
            position: "topRight",
            enabled: false,
            minimal: false,
        },
        mobile: {
            position: "topRight",
            enabled: false,
            minimal: false,
        },
    },
    notify: {
        transactionHandler: transaction => {
            console.log({ transaction });
            if (transaction.eventCode === "txPool") {
                return {
                    // autoDismiss set to zero will persist the notification until the user excuses it
                    autoDismiss: 0,
                    // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
                    // or you could use onClick for when someone clicks on the notification itself
                    onClick: () =>
                        window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
                };
            }
        },
    },
});
