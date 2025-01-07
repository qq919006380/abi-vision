"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractData } from "@/lib/db";
import { ReadFunctions } from "./tabs/ReadFunctions";
import { ViewFunctions } from "./tabs/ViewFunctions";
import { WriteFunctions } from "./tabs/WriteFunctions";
import { Eye, Pencil, Book } from "lucide-react";

interface Props {
  contract: ContractData;
}

export function ContractTabs({ contract }: Props) {
  return (
    <Tabs defaultValue="read" className="w-full">
      <TabsList className="w-full grid grid-cols-3 gap-4 rounded-lg p-2 h-auto">
        <TabsTrigger 
          value="read" 
          className="flex items-center justify-center gap-3 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <Book className="h-5 w-5" />
          <span className="text-base font-medium">Read</span>
        </TabsTrigger>
        <TabsTrigger 
          value="view" 
          className="flex items-center justify-center gap-3 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <Eye className="h-5 w-5" />
          <span className="text-base font-medium">View</span>
        </TabsTrigger>
        <TabsTrigger 
          value="write" 
          className="flex items-center justify-center gap-3 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <Pencil className="h-5 w-5" />
          <span className="text-base font-medium">Write</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="read">
        <ReadFunctions contract={contract} />
      </TabsContent>
      <TabsContent value="view">
        <ViewFunctions contract={contract} />
      </TabsContent>
      <TabsContent value="write">
        <WriteFunctions contract={contract} />
      </TabsContent>
    </Tabs>
  );
} 