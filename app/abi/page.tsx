import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import AddContractModal from "@/components/AddContractModal";

export default function ABI() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        {/* 图标和标题 */}
        <div className="p-4 rounded-full bg-muted">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Explore Smart Contracts</h2>
          <p className="text-muted-foreground max-w-md">
            Select a contract from the sidebar to view its functions and data, or add a new contract to get started
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <AddContractModal>
            <Button className="gap-2">
              Add New Contract
              <ArrowRight className="w-4 h-4" />
            </Button>
          </AddContractModal>
        </div>
      </div>
    </div>
  );
}
