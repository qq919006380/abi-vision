"use client";
import { ContractData } from "@/lib/db";
import { useContractRead } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      {readFunctions.map((func) => (
        <ReadFunctionCard 
          key={func.name} 
          contract={contract} 
          func={func} 
        />
      ))}
    </div>
  );
}

function ReadFunctionCard({ contract, func }: { contract: ContractData; func: any }) {
  const { data, isError, isLoading, refetch } = useContractRead({
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
            刷新
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div className="text-destructive">Error reading contract</div>
        ) : (
          <div className="font-mono break-all">
            {JSON.stringify(data)}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 