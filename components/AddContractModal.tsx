"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { erc20Abi, erc721Abi, erc4626Abi } from "viem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contractDB } from "@/lib/db";
import { Plus } from "lucide-react";
import { useChains } from "wagmi";

const STANDARD_ABIS = {
  ERC20: erc20Abi,
  ERC721: erc721Abi,
  ERC4626: erc4626Abi,
};

export default function AddContractModal({buttonClassName}: {buttonClassName?: string}) {
  const [address, setAddress] = useState("");
  const [abi, setAbi] = useState("");
  const [name, setName] = useState("");
  const [selectedChainId, setSelectedChainId] = useState<string>("");
  const router = useRouter();
  const chains = useChains();

  const handleAbiSelect = (value: keyof typeof STANDARD_ABIS) => {
    setAbi(JSON.stringify(STANDARD_ABIS[value], null, 2));
  };

  const handleSubmit = async () => {
    if (!selectedChainId) {
      alert("请选择链");
      return;
    }
    
    try {
      await contractDB.addContract({
        address,
        abi: JSON.parse(abi),
        chainId: parseInt(selectedChainId),
        name,
      });
      router.push('/abi');
    } catch (error) {
      console.error('Failed to add contract:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contract
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Chain</label>
            <Select onValueChange={setSelectedChainId} value={selectedChainId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id.toString()}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Contract Name</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Contract"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Contract Address</label>
            <Input 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..." 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Standard ABI Templates</label>
            <Select onValueChange={handleAbiSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a standard ABI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ERC20">ERC20</SelectItem>
                <SelectItem value="ERC721">ERC721</SelectItem>
                <SelectItem value="ERC4626">ERC4626</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Contract ABI</label>
            <Textarea 
              value={abi} 
              onChange={(e) => setAbi(e.target.value)}
              placeholder="[...]" 
              rows={10}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 