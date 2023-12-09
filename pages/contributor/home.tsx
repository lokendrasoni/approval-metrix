import Head from "next/head";
import ContributorHome from "src/modules/Contributor/Home";

export default function ContributorHomePage() {
    return (
        <>
            <Head>
                <title>Contributor Home</title>
            </Head>
            <ContributorHome />
        </>
    );
}
