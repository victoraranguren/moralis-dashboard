"use client";

import localFont from "next/font/local";
import "./globals.css";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import Moralis from "moralis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU0NGQxODU3LTMxOGMtNDNmNS1hNzg1LTM4NTc3ZGNkN2FiNCIsIm9yZ0lkIjoiNDAwOTEwIiwidXNlcklkIjoiNDExOTU1IiwidHlwZUlkIjoiOTcxODZlMTAtYWFjNS00MzdhLTlmZDQtZDRlYWI3MjVhNzQ5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjE1OTk2MDEsImV4cCI6NDg3NzM1OTYwMX0.t-dhVOz687FhnEJNTyuVhhWvYThJcazuv346oCdmVLg",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <UnifiedWalletProvider
            children={children}
            wallets={[]}
            config={{
              autoConnect: false,
              env: "mainnet-beta",
              metadata: {
                name: "UnifiedWallet",
                description: "UnifiedWallet",
                url: "https://jup.ag",
                iconUrls: ["https://jup.ag/favicon.ico"],
              },
              walletlistExplanation: {
                href: "https://station.jup.ag/docs/additional-topics/wallet-list",
              },
            }}
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
