import { ReadContractErrorType } from "@wagmi/core";
import { z } from 'zod';

const schema = z.union([
    z.string(),
    z.number(),
    z.bigint(),
    z.object({}).passthrough(),
    z.array(z.any()),
]);

function formatData(data: unknown): string {
    const result = schema.safeParse(data);
    if (!result.success) return '';

    const parsedData = result.data;
    if (typeof parsedData === 'string') return parsedData;
    if (typeof parsedData === 'number' || typeof parsedData === 'bigint') {
        return parsedData.toString();
    }
    return JSON.stringify(parsedData, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}

interface ContractFunctionOutputProps {
    isLoading: boolean;
    isError: boolean;
    error: ReadContractErrorType | null;
    data: any;
    hash?: string;
}

export function ContractFunctionOutput({
    isLoading,
    isError,
    error,
    data,
    hash
}: ContractFunctionOutputProps) {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div className="text-destructive">
                {error?.shortMessage || error?.message || "Error reading contract"}
            </div>
        );
    }

    return (
        <div className="font-mono break-all mt-4">
            {formatData(data)}
        </div>
    );
}
