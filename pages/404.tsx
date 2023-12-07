import Head from "next/head";
import ErrorPage from "src/modules/ErrorPage";

export default function NotFoundPage() {
    return (
        <>
            <Head>
                <title>404 Page not found | Parcel</title>
            </Head>
            {/*render - 404 error page */}
            <ErrorPage />
        </>
    );
}
