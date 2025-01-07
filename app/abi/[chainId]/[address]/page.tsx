"use client";
import { useContract } from "@/hooks/useContract";
import { ContractTabs } from "@/components/contract/ContractTabs";
import { notFound } from "next/navigation";
import { ContractHeader } from "@/components/contract/ContractHeader";
interface Props {
  params: {
    chainId: string;
    address: string;
  };
}

export default function ContractPage({ params }: Props) {
  const { chainId, address } = params;
  const { contract, loading } = useContract(Number(chainId), address);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contract) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <ContractHeader contract={contract} />
      <ContractTabs contract={contract} />
    </div>
  );
} 