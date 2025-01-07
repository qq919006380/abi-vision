"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractData } from "@/lib/db";
import { ReadFunctions } from "./tabs/ReadFunctions";
import { ViewFunctions } from "./tabs/ViewFunctions";
import { WriteFunctions } from "./tabs/WriteFunctions";

interface Props {
  contract: ContractData;
}

export function ContractTabs({ contract }: Props) {
  return (
    <Tabs defaultValue="read">
      <TabsList>
        <TabsTrigger value="read">只读</TabsTrigger>
        <TabsTrigger value="view">查询</TabsTrigger>
        <TabsTrigger value="write">操作</TabsTrigger>
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