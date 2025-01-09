"use client";
import { ContractData } from "@/lib/db";
import { useReadContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { AbiFunction } from "viem";
interface Props {
    contract: ContractData;
}

export function ReadFunctions({ contract }: Props) {
    const readFunctions = contract.abi.filter(
        (item) =>
            item.type === "function" &&
            (item.stateMutability === "view" || item.stateMutability === "pure") &&
            item.inputs.length === 0
    );

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {readFunctions.map((func, index) => (
                <ReadFunctionCard
                    key={`${(func as AbiFunction).name}-${index}`}
                    contract={contract}
                    func={func as AbiFunction}
                />
            ))}
        </div>
    );
}

function ReadFunctionCard({ contract, func }: { contract: ContractData; func: AbiFunction }) {

    const { data, isError, error, isLoading, refetch } = useReadContract({
        address: contract.address as `0x${string}`,
        abi: [func],
        functionName: func.name,
        chainId: contract.chainId,
    });

    // Custom serializer to handle BigInt values
    const formatData = (data: any) => {
        if (typeof data === 'string') return data;
        if (typeof data === 'bigint') return data.toString();
        if (data === null || data === undefined) return '';
        return JSON.stringify(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span>{func.name}</span>
                        <span className="text-xs text-muted-foreground">
                            ({func.outputs.map(o => o.type).join(', ')})
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isLoading}
                    >
                        <RefreshCw className="h-4 w-4" />
                        刷新
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div className="text-destructive">{error.shortMessage}</div>
                ) : (
                    <div className="font-mono break-all">
                        {formatData(data)}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 