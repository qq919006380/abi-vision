"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Wallet, LinkIcon, User } from 'lucide-react';
import Image from 'next/image';
export default function Header() {
    return (
        <header className="border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Image src="/logo.jpg" alt="Abi Vision" width={55} height={55} />
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
                                                <Button
                                                    onClick={openConnectModal}
                                                    type="button"
                                                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                                                >
                                                    <Wallet className="h-4 w-4" />
                                                    Connect Wallet
                                                </Button>
                                            );
                                        }



                                        return (
                                            <div className="flex items-center gap-3">
                                                {chain.unsupported ? <Button
                                                    onClick={openChainModal}
                                                    type="button"
                                                    variant="outline"
                                                    className="flex items-center gap-2"
                                                >
                                                    <LinkIcon className="h-4 w-4" />
                                                    Current Chain Id {chain.id}
                                                </Button>
                                                    :
                                                    <Button
                                                        onClick={openChainModal}
                                                        type="button"
                                                        variant="outline"
                                                        className="flex items-center gap-2"
                                                    >
                                                        {chain.hasIcon && (
                                                            <div
                                                                className="w-5 h-5 rounded-full overflow-hidden"
                                                                style={{
                                                                    background: chain.iconBackground,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={chain.name ?? 'Chain icon'}
                                                                        src={chain.iconUrl}
                                                                        className="w-5 h-5"
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {chain.name}
                                                    </Button>}

                                                <Button
                                                    onClick={openAccountModal}
                                                    type="button"
                                                    variant="outline"
                                                    className="flex items-center gap-2"
                                                >
                                                    <User className="h-4 w-4" />
                                                    {account.displayName}
                                                    {account.displayBalance && (
                                                        <span className="text-muted-foreground">
                                                            ({account.displayBalance})
                                                        </span>
                                                    )}
                                                </Button>
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