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
                    <ConnectButton
                        showBalance={true}
                        chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
                    />
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