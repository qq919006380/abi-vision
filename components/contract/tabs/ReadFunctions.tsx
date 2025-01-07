"use client";
import { ContractData } from "@/lib/db";
import { useReadContract } from "wagmi";
import { type ReadContractErrorType } from '@wagmi/core'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

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
          key={`${func.name}-${index}`}
          contract={contract} 
          func={func} 
        />
      ))}
    </div>
  );
}

function ReadFunctionCard({ contract, func }: { contract: ContractData; func: any }) {

  const { data, isError,error, isLoading, refetch } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: [func],
    functionName: func.name,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{func.name}</span>
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
            {JSON.stringify(data)}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 