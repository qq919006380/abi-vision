import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold">
                        Abi Vision
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ConnectButton 
                        showBalance={true}
                        chainStatus="icon"
                    />
                </div>
            </div>
        </header>
    );
} 