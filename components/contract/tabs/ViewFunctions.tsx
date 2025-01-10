"use client";
import { ContractData } from "@/lib/db";
import { readContract } from '@wagmi/core';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Search } from "lucide-react";
import type { AbiFunction, AbiParameter } from "viem";
import { ContractFunctionOutput } from "@/components/contract/ContractFunctionOutput";
import { useConfig } from "wagmi";
import { ReadContractErrorType, ReadContractReturnType } from "@wagmi/core";
interface Props {
    contract: ContractData;
}

export function ViewFunctions({ contract }: Props) {
    const viewFunctions = contract.abi.filter(
        (item): item is AbiFunction =>
            item.type === "function" &&
            (item.stateMutability === "view" || item.stateMutability === "pure") &&
            item.inputs.length > 0
    );

    return (
        <div className="grid gap-4">
            {viewFunctions.map((func) => (
                <ViewFunctionCard
                    key={(func as AbiFunction).name}
                    contract={contract}
                    func={func}
                />
            ))}
        </div>
    );
}

function ViewFunctionCard({ contract, func }: { contract: ContractData; func: AbiFunction }) {
    const config = useConfig();
    const [args, setArgs] = useState<any[]>(Array(func.inputs.length).fill(""));
    const [result, setResult] = useState<{
        data: any;
        isError: boolean;
        isLoading: boolean;
        error: ReadContractErrorType | null;
    }>({
        data: undefined,
        isError: false,
        isLoading: false,
        error: null
    });
    const handleQuery = async () => {
        
        try {
            setResult(prev => ({ ...prev, isLoading: true }));
            const data = await readContract(config, {
                address: contract.address as `0x${string}`,
                abi: [func],
                functionName: func.name,
                args
            });
            console.log(typeof data)
            setResult({
                data,
                isError: false,
                isLoading: false,
                error: null
            });
        } catch (error) {
            setResult({
                data: undefined,
                isError: true,
                isLoading: false,
                error: error as ReadContractErrorType
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-2">
                        <span>{func.name}</span>
                        <span className="text-xs text-muted-foreground">
                            ({func.outputs.map((o: AbiParameter) => o.type).join(', ')})
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {func.inputs.map((input: any, index: number) => (
                        <div key={input.name || index}>
                            <label className="text-sm font-medium">
                                {input.name || `Input ${index}`} ({input.type})
                            </label>
                            <Input
                                value={args[index]}
                                onChange={(e) => {
                                    const newArgs = [...args];
                                    newArgs[index] = e.target.value;
                                    setArgs(newArgs);
                                }}
                                placeholder={input.type}
                            />
                        </div>
                    ))}
                    <Button
                        onClick={handleQuery}
                        disabled={result.isLoading}
                    >
                        <Search className="h-4 w-4" />
                        查询
                    </Button>
                    <ContractFunctionOutput
                        isLoading={result.isLoading}
                        isError={result.isError}
                        error={result.error}
                        data={result.data}
                    />
                </div>
            </CardContent>
        </Card>
    );
} 