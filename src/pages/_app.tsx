import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useRef } from "react";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import Script from "next/script";

import { theme } from "@/styles/theme";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { captureAndPersistUtmFromLocation } from "@/utils/utm";

const GTM_ID = "GTM-PD3JQGRS";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const aosRef = useRef<null | { init: (opts: any) => void; refresh: () => void; refreshHard?: () => void }>(null);

  useEffect(() => {
    let mounted = true;

    const initAOS = async () => {
      if (typeof window === "undefined") return;
      const Aos = (await import("aos")).default;
      if (!mounted) return;
      aosRef.current = Aos as any;
      Aos.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
      });
    };

    initAOS();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleRouteDone = () => {
      // Let the new page/layout paint before recalculating offsets.
      window.setTimeout(() => {
        const aos = aosRef.current;
        if (!aos) return;
        if (typeof aos.refreshHard === "function") aos.refreshHard();
        else aos.refresh();
      }, 50);
    };

    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("hashChangeComplete", handleRouteDone);
    return () => {
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("hashChangeComplete", handleRouteDone);
    };
  }, [router.events]);

  useEffect(() => {
    captureAndPersistUtmFromLocation();
  }, [router.asPath]);

  return (
    <ThemeProvider theme={theme}>
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
