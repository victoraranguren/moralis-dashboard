"use client";

import localFont from "next/font/local";
import "./globals.css";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
