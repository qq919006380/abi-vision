"use client";
import { ContractData } from "@/lib/db";
import { writeContract } from "@wagmi/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { parseEther } from "viem";
import { config } from "@/provider/wagmiConfig";

interface Props {
  contract: ContractData;
}

export function WriteFunctions({ contract }: Props) {
  const writeFunctions = contract.abi.filter(
    (item) => 
      item.type === "function" && 
      item.stateMutability !== "view" && 
      item.stateMutability !== "pure"
  );

  return (
    <div className="grid gap-4">
      {writeFunctions.map((func) => (
        <WriteFunctionCard 
          key={func.name} 
          contract={contract} 
          func={func} 
        />
      ))}
    </div>
  );
}

function WriteFunctionCard({ contract, func }: { contract: ContractData; func: any }) {
  const [args, setArgs] = useState<any[]>(Array(func.inputs.length).fill(""));
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<string>();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const config: any = {
        address: contract.address as `0x${string}`,
        abi: [func],
        functionName: func.name,
        args,
      };
      
      if (func.payable && value) {
        config.value = parseEther(value);
      }
      
      const hash = await writeContract(config, config);
      setHash(hash);
    } catch (error) {
      console.error('Write error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          {func.payable && (
            <div>
              <label className="text-sm font-medium">Value (ETH)</label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0.0"
                type="number"
                step="0.000000000000000001"
              />
            </div>
          )}
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? "处理中..." : "执行"}
          </Button>
          {hash && (
            <div className="text-green-500">
              交易成功！
              <a 
                href={`https://etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline"
              >
                查看交易
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 