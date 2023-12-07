import { CSVErrorCodes, CSVItem } from "pages/api/csv/validate";

export const addCSVError = (index: number, error: string, item: CSVItem, headers: Set<string>) => {
    index = index + 1;
    headers.add(`error${index}`);
    item[`error${index}`] = error;
    return { index, item };
};

export const addError = (
    item: CSVItem,
    errors: Record<
        number,
        {
            index: number;
            item: CSVItem;
            errors: Array<string>;
        }
    >,
    errorCode: CSVErrorCodes,
    dealsFound?: Array<any>,
    deal?: any,
) => {
    let index = item?.index;

    item.isResolved = false;
    item.isRemoved = false;
    let error = errors[index] || {
        index: index,
        item: item,
        errors: [],
    };

    if (!error?.errors?.includes(errorCode)) {
        error?.errors?.push(errorCode);
    }

    if (deal) {
        // Deal that is being used
        error["deal"] = deal;
    }
    if (dealsFound && dealsFound?.length) {
        // Deals that are found
        error["dealList"] = dealsFound;
    }

    errors[index] = error;
};
