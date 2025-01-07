import AddContractModal from "@/components/AddContractModal";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">ABI Vision</h1>
        <p className="text-muted-foreground">Visualize and interact with smart contracts</p>
        <AddContractModal />
      </div>
    </div>
  );
}
