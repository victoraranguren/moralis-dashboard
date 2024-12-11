"use client";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Moralis from "moralis";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { connected, publicKey } = useWallet();

  const getPortfolio = async () => {
    try {
      if (publicKey) {
        const portfolio = await Moralis.SolApi.account.getPortfolio({
          network: "mainnet",
          address: publicKey.toString(),
        });

        console.log(portfolio.raw);
        return portfolio;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["portfolio", connected],
    queryFn: getPortfolio,
  });

  useEffect(() => {
    console.log(publicKey?.toString());
  }, [connected]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <UnifiedWalletButton />

      {isPending && "Loading..."}

      {error && "An error has occurred: " + error.message}

      {connected &&
        "Su balance de lamports es: " + data?.raw.nativeBalance.lamports}

      {!connected && "Su Wallet está desconectada"}

      {data && data.raw.nativeBalance.lamports}
    </div>
  );
}
