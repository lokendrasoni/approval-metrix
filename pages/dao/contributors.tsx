// pages/Dashboard.js

import Head from 'next/head';
import Sidebar from 'src/components/Sidebar';
import { MainContent, StyledContainer } from "./style";

export default function Contributors() {
  return (
    <StyledContainer>
      <Head>
        <title>Contacts</title>
      </Head>
      <Sidebar />
      <MainContent>
        <h1>Contacts</h1>
        <hr />
        <p>Welcome to your dashboard!</p>
      </MainContent>
    </StyledContainer>
  );
}