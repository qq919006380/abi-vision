"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { erc20Abi, erc721Abi, erc4626Abi, isAddress } from "viem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContractData, contractDB } from "@/lib/db";
import { Plus, Pencil } from "lucide-react";
import { useChains, useAccount } from "wagmi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const STANDARD_ABIS = {
    ERC20: erc20Abi,
    ERC721: erc721Abi,
    ERC4626: erc4626Abi,
};
const isAddress2 = (address: ContractData["address"]): boolean => {
    return isAddress(address)
}
const formSchema = z.object({
    chainId: z.string().min(1, { message: "Please select a chain" }),
    name: z.string().min(1, { message: "Contract name is required" }),
    address: z.string()
        .min(1, { message: "Contract address is required" })
        .refine(isAddress, { message: "Invalid contract address" })
        .transform((val) => val as `0x${string}` | ""),
    abi: z.string()
        .min(1, { message: "Contract ABI is required" })
        .refine((val) => {
            try {
                JSON.parse(val);
                return true;
            } catch {
                return false;
            }
        }, { message: "Invalid JSON format" }),
});

interface Props extends ButtonProps {
    contract?: ContractData;
}

export default function AddContractModal({ contract, className, ...buttonProps }: Props) {
    const isEdit = !!contract;
    const router = useRouter();
    const chains = useChains();
    const { chainId: currentChainId } = useAccount();
    const [open, setOpen] = useState(false);
    const allChains = useMemo(() => {
        return chains.some(chain => chain.id === currentChainId)
            ? chains
            : typeof currentChainId === 'number' ? [...chains, { id: currentChainId, name: `ChainId: ${currentChainId}` }] : chains;
    }, [chains, currentChainId]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chainId: contract?.chainId.toString() ?? "",
            name: contract?.name ?? "",
            address: contract?.address ?? "",
            abi: contract ? JSON.stringify(contract.abi, null, 2) : "",
        },
    });

    const handleAbiSelect = (value: keyof typeof STANDARD_ABIS) => {
        form.setValue("abi", JSON.stringify(STANDARD_ABIS[value], null, 2));
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (isEdit) {
                await contractDB.updateContract({
                    address: values.address,
                    abi: JSON.parse(values.abi),
                    chainId: parseInt(values.chainId),
                    name: values.name,
                });
                router.refresh();
            } else {
                await contractDB.addContract({
                    address: values.address,
                    abi: JSON.parse(values.abi),
                    chainId: parseInt(values.chainId),
                    name: values.name,
                });
                router.push(`/abi/${values.chainId}/${values.address}`);
            }
            setOpen(false);
        } catch (error) {
            console.error('Failed to save contract:', error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button variant="outline" size="icon" className={className} {...buttonProps} title="Edit">
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button className={className} {...buttonProps}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contract
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit Contract' : 'Add New Contract'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="chainId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium !text-foreground">Chain</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a chain" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allChains.map((chain) => (
                                                <SelectItem key={chain.id} value={chain.id.toString()}>
                                                    {chain.name} {currentChainId === chain.id && <span className="ml-2 text-xs text-blue-500">(Connected)</span>}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium !text-foreground">Contract Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Contract" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium !text-foreground">Contract Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0x..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <FormLabel className="font-medium !text-foreground">Standard ABI Templates</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="abi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium !text-foreground">Contract ABI</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="[...]"
                                            rows={10}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {isEdit ? 'Save' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 