import type {Metadata} from "next";
import "../styles/globals.css";
import "../styles/font.css"
import "../styles/mgpd.css"
import "../styles/common.css"
import {StoreProvider} from "@/src/provider/store-provider";
import React from "react";
import Head from "next/head";
import {GoogleAnalytics} from '@next/third-parties/google'

export const metadata: Metadata = {
    title: "Glee",
    description: "어떤 글을 써드릴까요? 상황별 필요한 글을 똑똑한 AI가 제안해줄게요",
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no"/>
        </Head>
        <body>
        <StoreProvider>
            <div className="body--wrap">
                {children}
            </div>
        </StoreProvider>
        </body>
        <GoogleAnalytics gaId="G-76265KEZ68"/>
        </html>
    );
}
