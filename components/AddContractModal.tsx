"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { erc20Abi, erc721Abi, erc4626Abi } from "viem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { openDB } from 'idb';

const STANDARD_ABIS = {
  ERC20: erc20Abi,
  ERC721: erc721Abi,
  ERC4626: erc4626Abi,
};

export default function AddContractModal() {
  const [address, setAddress] = useState("");
  const [abi, setAbi] = useState("");
  const router = useRouter();

  const handleAbiSelect = (value: keyof typeof STANDARD_ABIS) => {
    setAbi(JSON.stringify(STANDARD_ABIS[value], null, 2));
  };

  const handleSubmit = async () => {
    // 打开 IndexDB
    const db = await openDB('contracts', 1, {
      upgrade(db) {
        // 创建一个 store 来存储合约信息
        db.createObjectStore('contracts', { keyPath: 'address' });
      },
    });

    // 存储合约信息
    await db.put('contracts', {
      address,
      abi: JSON.parse(abi),
      timestamp: Date.now(),
    });

    router.push('/dashboard');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Contract</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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