"use client";
import { useEffect, useState } from "react";
import { ContractData, contractDB } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useContract } from "@/hooks/useContract";
import { ChevronDown, ChevronRight } from "lucide-react";
import AddressDisplay from "@/components/AddressDisplay";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [contracts, setContracts] = useState<ContractData[]>([]);
    const [expandedChains, setExpandedChains] = useState<Set<number>>(new Set());
    const params = useParams();
    const { chainId, address } = params as { chainId?: string; address?: string };
    
    const { contract: activeContract } = useContract(
        chainId ? Number(chainId) : 0, 
        address || ''
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

    const contractsByChain = contracts.reduce((acc, contract) => {
        if (!acc[contract.chainId]) {
            acc[contract.chainId] = [];
        }
        acc[contract.chainId].push(contract);
        return acc;
    }, {} as Record<number, ContractData[]>);

    const toggleChain = (chainId: number) => {
        const newExpanded = new Set(expandedChains);
        if (newExpanded.has(chainId)) {
            newExpanded.delete(chainId);
        } else {
            newExpanded.add(chainId);
        }
        setExpandedChains(newExpanded);
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-72 border-r bg-muted/30 p-6 space-y-6">
                <Link href="/abi/add">
                    <Card className="p-4 hover:bg-accent/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                        <div className="font-medium text-center text-sm">添加合约</div>
                    </Card>
                </Link>
                <div className="space-y-3">
                    {Object.entries(contractsByChain).map(([chainId, chainContracts]) => (
                        <div key={chainId} className="space-y-1.5">
                            <div 
                                className="flex items-center gap-2 px-3 py-2 hover:bg-accent/50 rounded-lg cursor-pointer transition-colors duration-200"
                                onClick={() => toggleChain(Number(chainId))}
                            >
                                {expandedChains.has(Number(chainId)) ? 
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                }
                                <span className="font-medium text-sm">Chain {chainId}</span>
                                <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">
                                    {chainContracts.length}
                                </span>
                            </div>
                            {expandedChains.has(Number(chainId)) && (
                                <div className="pl-4 space-y-2 animate-in slide-in-from-left-5 duration-200">
                                    {chainContracts.map((contract) => (
                                        <Link 
                                            key={`${contract.chainId}-${contract.address}`}
                                            href={`/abi/${contract.chainId}/${contract.address}`}
                                        >
                                            <Card 
                                                className={`p-3 hover:bg-accent/50 transition-all duration-200 shadow-sm hover:shadow-md ${
                                                    activeContract?.address === contract.address && 
                                                    activeContract?.chainId === contract.chainId
                                                        ? "bg-accent border-primary shadow-md"
                                                        : "bg-card"
                                                }`}
                                            >
                                                <div className="font-medium truncate text-sm">
                                                    {contract.name || "未命名合约"}
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate font-mono mt-1">
                                                    <AddressDisplay address={contract.address} />
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
