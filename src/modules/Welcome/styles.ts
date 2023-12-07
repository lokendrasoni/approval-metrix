import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const FlexContainer: any = styled("div")`
    display: flex;
    width: 376px;
    height: ${(props: any) => (props?.showContinue ? "163px" : "auto")};
    gap: 48px;
`;

export const SlideBox: any = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-out;
    transform: ${(props: any) =>
        props.toggleContinue ? "translateX(0)" : "translateX(calc(-100% - 48px))"};
`;

export const CenteredFlexBox: any = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
