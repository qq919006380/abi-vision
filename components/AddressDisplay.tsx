import { Copy, Check } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useState } from 'react'

export default function AddressDisplay({
    address,
    start = 6,
    end = 4,
    options = {
        showTooltip: false,
        showCopy: false
    }
}: {
    address?: string,
    start?: number,
    end?: number,
    options?: {
        showTooltip?: boolean,
        showCopy?: boolean
    }
}) {
    const [copied, setCopied] = useState(false)
    if (!address) return null

    const handleCopy = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // 2秒后恢复
    }

    const content = (
        <span className="inline-flex items-center gap-1">
            {address.slice(0, start)}...{address.slice(-end)}
            {options.showCopy && (
                copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy 
                        className="h-4 w-4 cursor-pointer hover:text-gray-600" 
                        onClick={handleCopy}
                    />
                )
            )}
        </span>
    )

    if (!options.showTooltip) return content

    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    {content}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content 
                        className="rounded-md bg-black px-3 py-1.5 text-xs text-white"
                        sideOffset={5}
                    >
                        {address}
                        <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}