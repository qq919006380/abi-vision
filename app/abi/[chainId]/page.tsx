"use client";
import { useParams } from "next/navigation";
import { useContract } from "@/hooks/useContract";
import { Card } from "@/components/ui/card";
import AddressDisplay from "@/components/AddressDisplay";
import { useChains } from "wagmi";
export default function ChainPage() {
  const params = useParams();
  const { chainId } = params;
  const chains = useChains();
  const chain = chains.find(c => c.id === Number(chainId));

  if (!chain) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chain Not Found</h1>
          <p className="text-muted-foreground">
            The specified chain ID does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{chain.name}</h1>
        <p className="text-muted-foreground">
          Chain ID: {chain.id}
        </p>
      </div>
      <div className="text-center">
        <p className="text-muted-foreground">
          Please select a contract from the sidebar to view its details
        </p>
      </div>
    </div>
  );
} 