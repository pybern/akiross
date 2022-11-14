import "../styles/globals.css";
import Layout from "../components/Layout";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8lhkt58W6QKs8gLNHa5eNfLqrnR9rhwo&libraries=places"
        strategy="beforeInteractive"
      />
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}
