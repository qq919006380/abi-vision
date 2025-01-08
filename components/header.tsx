"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function Header() {
    return (
        <header className="border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold">
                        Abi Vision
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            // Note: If your app doesn't use authentication, you
                            // can remove all 'authenticationStatus' checks
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button onClick={openConnectModal} type="button">
                                                    Connect Wallet
                                                </button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <button onClick={openChainModal} type="button">
                                                    Wrong network
                                                </button>
                                            );
                                        }

                                        return (
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                <button
                                                    onClick={openChainModal}
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    type="button"
                                                >
                                                    {chain.hasIcon && (
                                                        <div
                                                            style={{
                                                                background: chain.iconBackground,
                                                                width: 12,
                                                                height: 12,
                                                                borderRadius: 999,
                                                                overflow: 'hidden',
                                                                marginRight: 4,
                                                            }}
                                                        >
                                                            {chain.iconUrl && (
                                                                <img
                                                                    alt={chain.name ?? 'Chain icon'}
                                                                    src={chain.iconUrl}
                                                                    style={{ width: 12, height: 12 }}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {chain.name}
                                                </button>

                                                <button onClick={openAccountModal} type="button">
                                                    {account.displayName}
                                                    {account.displayBalance
                                                        ? ` (${account.displayBalance})`
                                                        : ''}
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                    <Link href="/abi">
                        <Button  >
                            <FileText className="h-4 w-4" />
                            My ABIs
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
} 