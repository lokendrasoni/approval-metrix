import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";

import createEmotionCache from "../styles/createEmotionCache";
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"));
const WalletcontextProvider = dynamic(() =>
    import("src/contexts/Walletcontext").then(mod => mod.WalletcontextProvider),
);
const Head = dynamic(() => import("next/head"));
const NextNProgress = dynamic(() => import("nextjs-progressbar"));
const CacheProvider = dynamic(() => import("@emotion/react").then(module => module.CacheProvider));
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function AppRoot(props: any) {
    const clientSideEmotionCache = createEmotionCache();
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
    
    <Head>
                <title>Approval Metrix</title>
                <meta name="description" content="Magically simplify payroll & payments" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Parcel" />
                <meta property="og:site_name" content="Parcel" />
                {typeof window !== "undefined" && (
                    <meta property="og:url" content={window.location.href} />
                )}
                <meta property="og:description" content="Magically simplify payroll & payments" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://v3.parcel.money/_next/static/media/parcel_logo.52c2d7d2.svg"
                />
            </Head>
            <NextNProgress
                color="#2962EF"
                options={{
                    showSpinner: false,
                }}
            />
            <CacheProvider value={emotionCache}>
                <QueryClientProvider client={queryClient}>
            <WalletcontextProvider>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                                                            
                    <Component {...pageProps} />
            </WalletcontextProvider>
            </QueryClientProvider>
            </CacheProvider>
    </>
  )
}
