/**
 * <Tooltip>
 * @author Smriti <smriti@parcel.money>
 * @description Creates a Tooltip comp
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1030%3A4008

 * @param   {<Placement>} placement <prop to indicate the position of tooltip>
 * @param   {<string> | <JSX.Element>} title <React node to be rendered inside the tooltip>
 * @param   {<React.ReactNode>} children <Element which opens tooltip on hover>
 * @return  {<JSX.Element>} <Tooltip layout will be returned with it's children>
 */
import { Typography } from "@mui/material";
import { StyledTooltip } from "./styles";
import { Props } from "./types";

export default function Tooltip({
    children,
    placement = "top",
    title,
    supportingText = "",
    disableCursorPointer = false,
    enterDelay = 100,
    enterNextDelay = 0,
    arrow = true,
    disableHoverListener = false,
    childrenStyle = {},
    disablePortal = false,
}: Props): JSX.Element {
    return (
        <StyledTooltip
            title={
                title || supportingText ? (
                    <>
                        {title && (
                            <Typography variant="h6" color={"white"}>
                                {title}
                            </Typography>
                        )}
                        {supportingText && (
                            <Typography variant="body2" color={"white"}>
                                {supportingText}
                            </Typography>
                        )}
                    </>
                ) : null
            }
            placement={placement}
            style={{ cursor: disableCursorPointer ? "default" : "pointer" }}
            enterDelay={enterDelay}
            enterNextDelay={enterNextDelay}
            disableHoverListener={disableHoverListener}
            arrow={arrow}
            PopperProps={{
                disablePortal: disablePortal,
                // popperOptions: {
                //     // positionFixed: true,
                //     modifiers: {
                //         preventOverflow: {
                //             // enabled: true,
                //             boundariesElement: "window", // where "window" is the boundary
                //         },
                //     },
                // },
            }}
        >
            <span style={childrenStyle}>{children}</span>
        </StyledTooltip>
    );
}
