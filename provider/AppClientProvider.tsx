'use client';
import { WagmiProvider } from 'wagmi'
import { config } from './wagmiConfig'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css';


const queryClient = new QueryClient()
export default function AppClientProvider({ children }: { children: React.ReactNode }) {
    return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
    </QueryClientProvider>
</WagmiProvider>
}