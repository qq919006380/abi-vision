"use client";
import { useEffect, useState } from "react";
import { ContractData, contractDB } from "@/lib/db";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useContract } from "@/hooks/useContract";
import { ChevronDown, ChevronRight } from "lucide-react";
import AddressDisplay from "@/components/AddressDisplay";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [contracts, setContracts] = useState<ContractData[]>([]);
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

    return (
        <div className="flex min-h-screen">
            <div className="w-80 border-r bg-muted/30 p-6 space-y-6">
                <Link href="/abi/add">
                    <Card className="p-4 hover:bg-accent/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                        <div className="font-medium text-center text-sm">添加合约</div>
                    </Card>
                </Link>
                
                <Accordion type="multiple" className="space-y-2">
                    {Object.entries(contractsByChain).map(([chainId, chainContracts]) => (
                        <AccordionItem 
                            key={chainId} 
                            value={chainId}
                            className="border rounded-lg px-2"
                        >
                            <AccordionTrigger className="hover:bg-accent/50 rounded-md px-2 [&[data-state=open]>svg]:text-primary">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">Chain {chainId}</span>
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                        {chainContracts.length}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 pt-2">
                                {chainContracts.map((contract) => (
                                    <Link 
                                        key={`${contract.chainId}-${contract.address}`}
                                        href={`/abi/${contract.chainId}/${contract.address}`}
                                        className="block"
                                    >
                                        <div 
                                            className={`
                                                relative px-4 py-3 rounded-md
                                                hover:bg-accent/50 transition-all duration-200
                                                ${
                                                    activeContract?.address === contract.address && 
                                                    activeContract?.chainId === contract.chainId
                                                        ? "bg-accent text-accent-foreground before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary before:rounded-full"
                                                        : "text-muted-foreground hover:text-foreground"
                                                }
                                            `}
                                        >
                                            <div className="font-medium truncate text-sm">
                                                {contract.name || "未命名合约"}
                                            </div>
                                            <div className="text-xs opacity-80 truncate font-mono mt-1">
                                                <AddressDisplay address={contract.address} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
