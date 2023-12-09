// pages/Dashboard.js

import Head from "next/head";
import Sidebar from "src/components/Sidebar";
import QuickSend from "src/modules/QuickSend";
import { MainContent, StyledContainer } from "./style";

export default function QuickSendPage() {
    return (
        <StyledContainer>
            <Head>
                <title>Quick Send</title>
            </Head>
            <Sidebar />
            <MainContent>
                <h1>Quick Send</h1>
                <QuickSend />
            </MainContent>
        </StyledContainer>
    );
}
