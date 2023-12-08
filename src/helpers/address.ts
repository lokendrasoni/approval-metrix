import { getMultiSendDeployment } from "@safe-global/safe-deployments";

export const getProxyFactoryContractAddress = networkId => {
    const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_VERCEL_ENV;

    if (APP_ENVIRONMENT == "production") {
        switch (networkId) {
            case 1:
                return "0xb5CC3DB7c2D0eE7002DC22d858BFc8B8969d938E";
            case 4:
                return "";
            case 5:
                return "0xB114ba94B16A8F45973ACED95aAFB751aeBA40f1";
            case 10:
                return "0x80A83c4f2Fc5Be43c08A5b95e582Ed06D864E04b";
            case 137:
                return "0x3523eD9B02f859f93eD187007408f2361862d8b9";
            case 56:
                return "0x35aD5a1cD3533495262aFd982be3003Ea77D3C31";
            case 42161:
                return "0xdC11aC97e2ad6ae8f48A44E34dDE455843D163A4";
            default:
                return "";
        }
    } else {
        switch (networkId) {
            case 1:
                return "0xeC8d3ed3585Ce55749DB485463182c3C647Ab67E";
            case 4:
                return "0x4b7a892Ad51f670eE9C09BD8f0Ea4AC79AeE39A0";
            case 5:
                return "0xC3a47C8d4E642Ef2c26b770e3A7a2B97a7490E0D";
            case 10:
                return "0xCdECa3Ff1d9E798E04Df3790b3dbDccbDEcd4F96";
            case 137:
                return "0xC20A60Fe34a6Bf5aeD2BAc9263AF50EE5680CA21";
            case 42161:
                return "0x173EB767B170dc81955d30D37Ec0eaD9De12524e";
            case 56:
                return "0xb3890bca8551dec2a22121682247e8fcf185554e";
            default:
                return "0x4b7a892Ad51f670eE9C09BD8f0Ea4AC79AeE39A0";
        }
    }
};

export const getMultisendContractAddress = networkId => {
    return getMultiSendDeployment({ network: networkId })?.defaultAddress;
};

export const getAllownceModuleContractAddress = networkId => {
    switch (networkId) {
        case 1:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
        case 4:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
        case 5:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
        case 10:
            return "0x964275bba107088968AC71584D168dA1D5F10D1a";
        case 137:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
        case 42161:
            return "0xb55e84cB8fb33E43A9d84eDeb324a4080341d064";
        case 56:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
        default:
            return "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134";
    }
};
