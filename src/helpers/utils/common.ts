import Decimal from "decimal.js-light";
import { constants } from "ethers";
import _ from "lodash";
import { getTokenContractAddress } from "mapping/tokenAddress";
import moment from "moment";
import { NextRouter } from "next/router";
import {
    bigNumberToString,
    bigNumberfromWei,
    stringNumberToWei,
    weiToString,
} from "./bignumberUtils";
import { calculateMaxDecimalPlaces } from "./web3Utils";
export const validNumberString = x => {
    if (Boolean(x)) {
        const checkIfValidNumber = Number(x);
        if (isNaN(checkIfValidNumber)) {
            return "0";
        } else {
            return String(x);
        }
    } else {
        return "0";
    }
};

export function finiteNumber(x) {
    if (x == "0" || x == 0) {
        return 1;
    } else {
        return x;
    }
}

export function roundOff(x, decimals = 2) {
    if (x) {
        let decimalPlaces = x && x.toString().split(".")[1]?.length;
        if (decimalPlaces && decimalPlaces > decimals) {
            return new Decimal(x)?.toFixed(decimals);
        } else return new Decimal(x).toFixed(decimalPlaces);
    } else {
        return "0";
    }
}

export const nth = function (d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

// program to generate random strings

// declare all characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function validateEmail(mail) {
    return String(mail)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
}

// Util function to check if object is empty
export function isObjectEmpty(obj) {
    return Object.keys(obj || {}).length <= 0;
}

export function getCurrentMonthStartMins() {
    const date = new Date();
    let firstDayTimestamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    if (date.getMonth() === 1) {
        firstDayTimestamp = firstDayTimestamp - 259200000; // if current month is feb, then subtract 3 days to start from 29th of jan
    }
    const startMinsOfMonth = Math.floor(firstDayTimestamp / (1000 * 60));
    return startMinsOfMonth;
}

export function getLast25thDateMin() {
    let _25thOfCurrentMonth = new Date();
    _25thOfCurrentMonth.setUTCDate(25);
    _25thOfCurrentMonth.setUTCHours(0, 0, 0, 0);
    if (_25thOfCurrentMonth.getTime() > Date.now()) {
        _25thOfCurrentMonth.setUTCMonth(_25thOfCurrentMonth.getUTCMonth() - 1);
    }
    return Math.floor(_25thOfCurrentMonth.getTime() / 60000);
}

export const refreshIntervalMins = 43800; // (365/12) * 24 * 60 = 43800

export const getLastDayOfMonth = (dueDate, startDate = moment()?.format("YYYY-MM-DD")) => {
    if (dueDate == "-1") {
        return new String(moment(startDate)?.daysInMonth());
    } else {
        return _.padStart(dueDate, 2, "0");
    }
};

export const getNDaysBeforeLastDayOfMonth = (
    dueDate,
    startDate = moment()?.format("YYYY-MM-DD"),
) => {
    if (dueDate < 0) {
        return new String(moment(startDate)?.daysInMonth() - (dueDate == -1 ? 0 : dueDate * -1));
    } else {
        return _.padStart(dueDate, 2, "0");
    }
};

export const getCurrentMonthStartDate = () => {
    return moment(`${moment().year()}${moment().format("MM")}01`).format("YYYY-MM-DD");
};

export const getCurrentMonthEndDate = () => {
    return moment(`${moment().year()}${moment().format("MM")}${moment().daysInMonth()}`).format(
        "YYYY-MM-DD",
    );
};
export const getCurrentMonthNDate = (n = 0) => {
    return moment(
        `${moment().year()}${moment().format("MM")}${moment().daysInMonth() - (n == 1 ? 0 : n)}`,
    ).format("YYYY-MM-DD");
};

export const getNextMonthStartDate = () => {
    const currentMonthStartDate = getCurrentMonthStartDate();
    return moment(currentMonthStartDate).add(1, "months").format("YYYY-MM-DD");
};

// only pass positive number
export const getNextMonthPayoutDay = day => {
    if (day < 0) {
    } else {
        const nextMonthStartDate = getNextMonthStartDate();
        return moment(
            `${moment(nextMonthStartDate).year()}${moment(nextMonthStartDate).format(
                "MM",
            )}${_.padStart(day, 2, "0")}`,
        );
    }
};

export const getNextMonthEndDate = (startDate = null) => {
    const nextMonthStartDate = startDate
        ? moment(`${moment(startDate).year()}${moment(startDate).format("MM")}${"01"}`)?.add(1, "M")
        : getNextMonthStartDate();
    return moment(
        `${moment(nextMonthStartDate).year()}${moment(nextMonthStartDate).format("MM")}${moment(
            nextMonthStartDate,
        ).daysInMonth()}`,
    );
};

export const getNextMonthNDate = (startDate = null, n = 0) => {
    const nextMonthStartDate = startDate
        ? moment(`${moment(startDate).year()}${moment(startDate).format("MM")}${"01"}`)?.add(1, "M")
        : getNextMonthStartDate();
    return moment(
        `${moment(nextMonthStartDate).year()}${moment(nextMonthStartDate).format("MM")}${
            moment(nextMonthStartDate).daysInMonth() - (n == 1 ? 0 : n)
        }`,
    );
};

export const getPreviousMonthStartDate = () => {
    const currentMonthStartDate = getCurrentMonthStartDate();
    return moment(currentMonthStartDate).subtract(1, "months").format("YYYY-MM-DD");
};

export const getPreviousMonthEndDate = () => {
    const previousMonthStartDate = getPreviousMonthStartDate();
    return moment(
        `${moment(previousMonthStartDate).year()}${moment(previousMonthStartDate).format(
            "MM",
        )}${moment(previousMonthStartDate).daysInMonth()}`,
    ).format("YYYY-MM-DD");
};

export const getPreviousMonthNDate = (n = 0) => {
    const previousMonthStartDate = getPreviousMonthStartDate();
    return moment(
        `${moment(previousMonthStartDate).year()}${moment(previousMonthStartDate).format("MM")}${
            moment(previousMonthStartDate).daysInMonth() - (n == 1 ? 0 : n)
        }}`,
    ).format("YYYY-MM-DD");
};

export const getPayoutDate = payoutDay => {
    const currentMonthStartDate = getCurrentMonthStartDate();
    return payoutDay < 0
        ? moment(
              `${moment(currentMonthStartDate).year()}${moment(currentMonthStartDate).format(
                  "MM",
              )}${getNDaysBeforeLastDayOfMonth(payoutDay, currentMonthStartDate).slice(-2)}`,
          ).format("YYYY-MM-DD")
        : moment(
              `${moment().year()}${moment().format("MM")}${_.padStart(payoutDay, 2, "0")}`,
          ).format("YYYY-MM-DD");
};

export const getIsUnderTimeLock = payoutDay => {
    const currentMonthStartDate = getCurrentMonthStartDate();
    const currentMonthEndDate = getCurrentMonthEndDate();
    const PayoutDayDate = getPayoutDate(payoutDay);

    if (payoutDay < 0) {
        return (
            moment(moment().format("YYYY-MM-DD")).isSameOrAfter(
                getCurrentMonthNDate(payoutDay * -1),
            ) && moment(moment().format("YYYY-MM-DD")).isSameOrBefore(currentMonthEndDate, "day")
        );
    }
    return (
        moment(moment().format("YYYY-MM-DD")).isSameOrAfter(currentMonthStartDate) &&
        moment(moment().format("YYYY-MM-DD")).isSameOrBefore(PayoutDayDate, "day")
    );
};

export const getActiveApprovalsOfInvoiceFromLineItems = invoice => {
    let lineItems = invoice?.lineItems?.filter(({ status }) => status == "active");
    const activeApprovals = lineItems?.[0]?.approvals?.filter(({ status }) => status == "active");

    return activeApprovals || [];
};

export const getApprovalsCountOfInvoice = invoice => {
    let lineItems = invoice?.lineItems?.filter(({ status }) => status == "active");
    const activeApprovals = lineItems?.[0]?.approvals?.filter(({ status }) => status == "active");
    return activeApprovals?.length || 0;
};

export const isMultiTokenInvoice = ({ lineItems }) => {
    lineItems = lineItems?.filter(({ status }) => status == "active");
    const uniqueLineItemsByTokenAddress = _.uniqBy(lineItems, "tokenAddress");
    return (uniqueLineItemsByTokenAddress || [])?.length > 1 ? true : false;
};

//sorted by tokenAddress
export const uniqueTokenAddressOfInvoice = ({ lineItems, invoice }) => {
    lineItems =
        invoice?.invoiceStatus != "rejected"
            ? lineItems?.filter(({ status }) => status == "active")
            : lineItems;
    const uniqueLineItemsByTokenAddress = _.uniqBy(lineItems, "tokenAddress");

    const uniqueTokenAddresses = (uniqueLineItemsByTokenAddress || [])?.map(
        (item: any) => item?.tokenAddress,
    );

    const sortThemByTokenAddress = uniqueTokenAddresses?.sort((a, b) => {
        return getTokenContractAddress(a)?.toLowerCase() > getTokenContractAddress(b)?.toLowerCase()
            ? 1
            : -1;
    });

    return sortThemByTokenAddress;
};

export const getTotalAmountOfInvoiceLineItemsByTokenAddress = ({
    lineItems,
    conversionByTokenAddress = {},
}) => {
    const sumTokenByTokenAddress = {};
    const tokenInfo = {};
    let filteredItems = lineItems || [];

    filteredItems = lineItems?.filter(({ status }) => status == "active");

    const uniqueLineItemsByTokenAddress = _.uniqBy(lineItems, "tokenAddress");

    uniqueLineItemsByTokenAddress.forEach(({ tokenAddress, ...otherProps }: any) => {
        tokenInfo[tokenAddress] = {
            ...otherProps,
            tokenAddress,
        };
    });

    filteredItems.forEach(
        ({
            tokenAddress,
            amount,
            approvals,
            fiatConversion,
            fiatAmount,
            isAmountInFiat,
            decimals,
        }) => {
            const noOfapprovals = (approvals || [])?.length;
            const lockedFiatConversion = fiatConversion;
            const CurrentfiatConversion = conversionByTokenAddress[tokenAddress];

            const fiatConversionCalc =
                noOfapprovals > 0 && Number(fiatConversion) > 0
                    ? Number(lockedFiatConversion)
                    : CurrentfiatConversion;
            const tokenValue =
                Number(fiatConversionCalc) > 0 && Number(fiatAmount) > 0 && isAmountInFiat
                    ? new Decimal(fiatAmount).div(new Decimal(fiatConversionCalc))?.toString()
                    : "0";

            let maxDecimal = calculateMaxDecimalPlaces(tokenValue, 6);
            if (maxDecimal > decimals) {
                maxDecimal = decimals;
            }
            const tokenValueInWei = isAmountInFiat
                ? stringNumberToWei(roundOff(tokenValue, maxDecimal), decimals)
                : amount;

            const amountCalc =
                amount && Number(amount) > 0 && noOfapprovals > 0 ? amount : tokenValueInWei;
            if (sumTokenByTokenAddress[tokenAddress]) {
                sumTokenByTokenAddress[tokenAddress] = bigNumberToString(
                    bigNumberfromWei(sumTokenByTokenAddress[tokenAddress]).add(
                        bigNumberfromWei(amountCalc),
                    ),
                );
            } else {
                sumTokenByTokenAddress[tokenAddress] = amountCalc;
            }
        },
    );

    return sumTokenByTokenAddress;
};

export const getLineItemAmount = (lineItem, fiatConversion, currentFiatConversion) => {
    const approvals = lineItem?.approvals;
    const fiatAmount = lineItem?.fiatAmount;
    const isAmountInFiat = lineItem?.isAmountInFiat;
    const decimals = lineItem?.decimals;
    const amount = lineItem?.amount;
    const noOfapprovals = (approvals || [])?.length;
    const lockedFiatConversion = fiatConversion;
    const CurrentfiatConversion = currentFiatConversion;

    const fiatConversionCalc =
        noOfapprovals > 0 && Number(fiatConversion) > 0
            ? Number(lockedFiatConversion)
            : CurrentfiatConversion;
    const tokenValue =
        Number(fiatConversionCalc) > 0 && Number(fiatAmount) > 0 && isAmountInFiat
            ? new Decimal(fiatAmount).div(new Decimal(fiatConversionCalc))?.toString()
            : "0";

    let maxDecimal = calculateMaxDecimalPlaces(tokenValue, 6);
    if (maxDecimal > decimals) {
        maxDecimal = decimals;
    }

    const tokenValueInWei = isAmountInFiat
        ? stringNumberToWei(roundOff(tokenValue, maxDecimal), decimals)
        : amount;
    const amountCalc = amount && Number(amount) > 0 && noOfapprovals > 0 ? amount : tokenValueInWei;
    return amountCalc;
};
export const getTotalAmountOfInvoiceLineItems = ({
    lineItems,
    fiatConversion,
    noOfapprovals,
    CurrentfiatConversion,
    decimals,
    amount,
    getOnlyActiveCount = false,
}) => {
    let filteredItems = lineItems || [];

    if (filteredItems.some(({ status }) => status === "active") || getOnlyActiveCount) {
        filteredItems = lineItems?.filter(({ status }) => status == "active");
    }

    const totalAmount = filteredItems
        ?.reduce((acc, curr) => {
            const fiatConversionCalc =
                noOfapprovals > 0 && Number(fiatConversion) > 0
                    ? Number(fiatConversion)
                    : CurrentfiatConversion;
            const tokenValue =
                Number(fiatConversionCalc) > 0 && curr?.fiatAmount
                    ? new Decimal(curr?.fiatAmount || 0).div(fiatConversionCalc || 0)?.toString()
                    : "0";
            let maxDecimal = calculateMaxDecimalPlaces(tokenValue, 6);
            if (maxDecimal > decimals) {
                maxDecimal = decimals;
            }
            const tokenValueInWei = stringNumberToWei(roundOff(tokenValue, maxDecimal), decimals);
            acc = curr?.isAmountInFiat
                ? acc.add(bigNumberfromWei(tokenValueInWei))
                : acc.add(bigNumberfromWei(curr?.amount));
            return acc;
        }, constants.Zero)
        ?.toString();

    return amount && Number(amount) > 0 && noOfapprovals > 0 ? amount : totalAmount;
};

export const getEpochEndDateForMonthFromPayoutDay = (payoutDay, addMonths = 0) => {
    const newDate = moment()?.add(addMonths, "months");
    const currentMonthDays = moment(newDate).daysInMonth();
    let t1;
    if (payoutDay == -1 || payoutDay > currentMonthDays) {
        t1 = newDate.endOf("M")?.format("YYYY-MM-DD");
    } else {
        t1 = moment(
            `${moment(newDate).year()}${moment(newDate).format("MM")}${_.padStart(
                payoutDay,
                2,
                "0",
            )}`,
        ).format("YYYY-MM-DD");
    }
    return t1;
};

export const getActiveLineItemsOfInvoice = invoice => {
    let lineItems =
        invoice?.lineItems && invoice?.lineItems?.filter(({ status }) => status == "active");
    return lineItems || [];
};

export const getFormattedDate = date => {
    return moment(date || moment())?.format("YYYY-MM-DD");
};

export const calculateCycleEndDateForWeek = (payoutDay, dealStartDate, skip = 0) => {
    //payoutDay = 0 to 6

    let dateCalc = moment(dealStartDate).add(skip, "week");

    // // if deal start day and payout day falls on same day , search next end Data
    // if (dateCalc?.day() == payoutDay) {
    //   dateCalc = dateCalc?.add(1, "day");
    // }
    while (dateCalc?.day() != payoutDay) {
        dateCalc = dateCalc.add(1, "day");
    }
    return dateCalc?.format("YYYY-MM-DD");
};

export const getPayoutDateOfSpecificDate = (payoutDay, dealDate) => {
    const currentMonthStartDate = moment(
        `${moment(dealDate).year()}${moment(dealDate).format("MM")}01`,
    ).format("YYYY-MM-DD");
    return payoutDay < 0
        ? moment(
              `${moment(currentMonthStartDate).year()}${moment(currentMonthStartDate).format(
                  "MM",
              )}${getNDaysBeforeLastDayOfMonth(payoutDay, currentMonthStartDate).slice(-2)}`,
          ).format("YYYY-MM-DD")
        : moment(
              `${moment(currentMonthStartDate).year()}${moment(currentMonthStartDate).format(
                  "MM",
              )}${_.padStart(payoutDay, 2, "0")}`,
          ).format("YYYY-MM-DD");
};
export const calculateCycleEndDateForSemimonthly = dealStartDate => {
    //payoutDay = 15 or -1
    const dealStartDateMoment = moment(dealStartDate);
    if (dealStartDateMoment?.date() <= 15) {
        return getPayoutDateOfSpecificDate(15, dealStartDate);
    } else {
        return getPayoutDateOfSpecificDate(-1, dealStartDate);
    }
};

// Use this fucntion to replace project ID in lineitems with the project, after using aggregation
export const replaceProjectIdWithProject = (lineItems, projectsList) => {
    let updatedItems = lineItems;
    if (projectsList && projectsList?.length) {
        updatedItems = lineItems?.map(item => {
            // IF project exists on line item, replace it with project
            if (item?.project) {
                item.project =
                    projectsList.find(
                        project => project?._id?.toString() === item?.project?.toString(),
                    ) || null;
            }
            return item;
        });
    }
    return updatedItems;
};

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (_item: T) => K) =>
    list.reduce(
        (previous, currentItem) => {
            const group = getKey(currentItem);
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        },
        {} as Record<K, T[]>,
    );

export const hashCode = s => {
    return s
        .split("")
        .reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0)
        ?.toString();
};

export const hasQueryPrams = (router: NextRouter, queryParams: Array<string>) => {
    let params = Object.keys(router?.query || {});
    return queryParams?.some(param => params?.includes(param));
};
export const removeQueryParam = (router, ...queryParams) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    for (let param of queryParams) params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, { shallow: true });
};
export const addQueryParam = (
    router: NextRouter,
    param: Record<string, string>,
    pathName: string = null,
    shallow: boolean = false,
) => {
    if (!pathName) {
        pathName = router?.pathname;
    }
    let previousQuery = router?.query;
    router.replace({ pathname: pathName, query: { ...previousQuery, ...param } }, undefined, {
        shallow,
    });
};
