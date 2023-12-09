import Head from "next/head";
import ContributorLogin from "src/modules/Contributor/Login";

export default function Contributor() {
    return (
        <>
            <Head>
                <title>Contributor Login</title>
            </Head>
            <ContributorLogin />
        </>
    );
}
