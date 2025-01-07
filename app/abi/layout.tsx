"use client";
import { useEffect, useState } from "react";
import { ContractData, contractDB } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useContract } from "@/hooks/useContract";
import { useParams } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [contracts, setContracts] = useState<ContractData[]>([]);
    const params = useParams();
    const { chainId, address } = params;
    const { contract: activeContract } = useContract(
        Number(chainId), 
        address as string
    );

    useEffect(() => {
        const loadContracts = async () => {
            const allContracts = await contractDB.getAllContracts();
            console.log(111,allContracts);
            const contractsList = Object.values(allContracts).flatMap((chainContracts): ContractData[] => 
                Object.values(chainContracts)
            );
            setContracts(contractsList);
        };

        loadContracts();
    }, []);

    return (
        <div className="flex min-h-screen">
            <div className="w-64 border-r p-4 space-y-4">
                <h2 className="font-semibold mb-4">已保存的合约</h2>
                <div className="space-y-2">
                    {contracts.map((contract) => (
                        <Link 
                            key={`${contract.chainId}-${contract.address}`}
                            href={`/abi/${contract.chainId}/${contract.address}`}
                        >
                            <Card 
                                className={`p-3 hover:bg-muted transition-colors ${
                                    activeContract?.address === contract.address && 
                                    activeContract?.chainId === contract.chainId
                                        ? "border-primary"
                                        : ""
                                }`}
                            >
                                <div className="font-medium truncate">
                                    {contract.name || "未命名合约"}
                                </div>
                                <div className="text-xs text-muted-foreground truncate font-mono">
                                    {contract.address}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Chain ID: {contract.chainId}
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
