"use client";
import { ContractData } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { useChainId, useChains } from "wagmi";
import { Share2, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { contractDB } from "@/lib/db";
import  AddContractModal  from "@/components/AddContractModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
  contract: ContractData;
}

export function ContractHeader({ contract }: Props) {
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const router = useRouter();
  const getExplorerUrl = () => {
    if (!chain?.blockExplorers?.default?.url) return "";
    return `${chain.blockExplorers.default.url}/address/${contract.address}`;
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // 可以添加一个 toast 提示复制成功
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async () => {
    await contractDB.deleteContract(contract.chainId, contract.address);
    router.push("/abi");
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {contract.name || "Unnamed Contract"}
          </h1>
          <p className="text-muted-foreground font-mono">
            {contract.address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(getExplorerUrl(), "_blank")}
            title="View in Explorer"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <AddContractModal
            contract={contract}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Contract</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this contract? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
} 