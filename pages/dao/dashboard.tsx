// pages/Dashboard.js

import Head from "next/head";
import Sidebar from "src/components/Sidebar";
import { MainContent, StyledContainer } from "styles/style";

export default function Dashboard() {
    return (
        <StyledContainer>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Sidebar />
            <MainContent>
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard!</p>
            </MainContent>
        </StyledContainer>
    );
}
