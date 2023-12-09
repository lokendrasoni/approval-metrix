import styled from "@emotion/styled";
import { Container } from "@mui/material";

export const StyledContainer: any = styled(Container)`
    display: flex;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: unset !important;
    width: 100%;
`;

export const SidebarDiv: any = styled.div`
    width: 20vw;
    height: 100vh;
    background-color: #1a202c;
    color: #fff;
    padding: 20px;
`;

export const MainContent: any = styled.div`
    margin-left: 20px;
    padding: 20px;
    width: 100%;
`;
