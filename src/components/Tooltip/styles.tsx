import styled from "@emotion/styled";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const StyledTooltip = styled(props => (
    <Tooltip classes={{ popper: props.className }} {...props} />
))`
    & .MuiTooltip-tooltip {
        background: grey !important;
        border-radius: 8px;
        color: white;
        padding: 8px 12px;
    }
    & .${tooltipClasses.arrow} {
        color: grey !important;
    }
`;
