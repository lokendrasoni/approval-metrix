import { ThemeOptions } from "@mui/material/styles";

export type Placement =
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left"
    | "right"
    | "top-end"
    | "top-start"
    | "top";

export interface Props {
    children: React.ReactNode;
    placement?: Placement;
    title?: string | JSX.Element;
    supportingText?: string | JSX.Element;
    disableCursorPointer?: boolean;
    enterDelay?: number;
    enterNextDelay?: number;
    disableHoverListener?: boolean;
    arrow?: boolean;
    childrenStyle?: any;
    disablePortal?: boolean;
}

export interface StyleProps {
    placement: Placement;
    title?: string | JSX.Element;
    theme: ThemeOptions;
}
