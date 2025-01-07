"use client";
import { ContractData } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { useChainId, useChains } from "wagmi";
import { Share2, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { contractDB } from "@/lib/db";
import  AddContractModal  from "@/components/AddContractModal";

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
    if (!confirm("确定要删除这个合约吗？")) return;
    
    await contractDB.deleteContract(contract.chainId, contract.address);
    router.push("/");
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {contract.name || "未命名合约"}
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
            title="分享"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(getExplorerUrl(), "_blank")}
            title="在区块浏览器中查看"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <AddContractModal
            contract={contract}
          >
          </AddContractModal>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            title="删除"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 