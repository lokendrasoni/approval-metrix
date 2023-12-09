// pages/Dashboard.js

import Head from 'next/head';
import Sidebar from 'src/components/Sidebar';
import { MainContent, StyledContainer } from "./style";

export default function QuickSend() {
  return (
    <StyledContainer>
      <Head>
        <title>Quick Send</title>
      </Head>
      <Sidebar />
      <MainContent>
        <h1>Quick Send</h1>
        {/* Add Quick Send Component here */}
      </MainContent>
    </StyledContainer>
  );
}