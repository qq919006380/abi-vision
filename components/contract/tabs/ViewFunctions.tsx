"use client";
import { ContractData } from "@/lib/db";
import { useContractRead } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  contract: ContractData;
}

export function ViewFunctions({ contract }: Props) {
  const viewFunctions = contract.abi.filter(
    (item) => 
      item.type === "function" && 
      (item.stateMutability === "view" || item.stateMutability === "pure") &&
      item.inputs.length > 0
  );

  return (
    <div className="grid gap-4">
      {viewFunctions.map((func) => (
        <ViewFunctionCard 
          key={func.name} 
          contract={contract} 
          func={func} 
        />
      ))}
    </div>
  );
}

function ViewFunctionCard({ contract, func }: { contract: ContractData; func: any }) {
  const [args, setArgs] = useState<any[]>(Array(func.inputs.length).fill(""));
  const { data, isError, isLoading, refetch } = useContractRead({
    address: contract.address as `0x${string}`,
    abi: [func],
    functionName: func.name,
    args
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{func.name}</CardTitle>
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
            onClick={() => refetch()} 
            disabled={isLoading}
          >
              <Search className="h-4 w-4" />

            查询
          </Button>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div className="text-destructive">Error reading contract</div>
          ) : data ? (
            <div className="font-mono break-all mt-4">
              {JSON.stringify(data)}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
} 