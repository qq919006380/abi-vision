import AddContractModal from "@/components/AddContractModal";
import { Database, Shield, Code, ArrowRight, Box } from "lucide-react";
import { SiGithub } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-black" />,
      title: "Open Source",
      description: "Fully open-source codebase, supporting community audit and contributions"
    },
    {
      icon: <Shield className="w-8 h-8 text-black" />,
      title: "Secure & Reliable",
      description: "Data stored locally, ensuring your privacy"
    },
    {
      icon: <Database className="w-8 h-8 text-black" />,
      title: "User Friendly",
      description: "Intuitive visual interface for simpler smart contract interactions"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden ">
      <div className="absolute bg-slate-300 inset-0 bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      {/* ERC20 Methods Display */}
      <div className="absolute top-20 right-10 w-[400px] h-[300px] opacity-80 transform rotate-6">
        <div className="bg-black rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-blue-400">balanceOf(address)</div>
          <div className="text-green-400">1000000000000000000</div>
          <div className="text-blue-400">allowance(address,address)</div>
          <div className="text-green-400">500000000000000000</div>
          <div className="text-blue-400">transfer(address,uint256)</div>
          <div className="text-green-400">true</div>
        </div>
      </div>

      {/* ERC721 Methods Display */}
      <div className="absolute top-40 right-[300px] w-[400px] h-[300px] opacity-80 transform rotate-[-8deg]">
        <div className="bg-black rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-blue-400">ownerOf(tokenId)</div>
          <div className="text-green-400">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
          <div className="text-blue-400">tokenURI(tokenId)</div>
          <div className="text-green-400">"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"</div>
          <div className="text-blue-400">approve(address,tokenId)</div>
          <div className="text-green-400">true</div>
        </div>
      </div>

      {/* Original auction display */}
      <div className="absolute top-60 right-[150px] w-[400px] h-[300px] opacity-80 transform rotate-12">
        <div className="bg-black rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-blue-400">AUCTION_DROP_INTERVAL</div>
          <div className="text-green-400">1200</div>
          <div className="text-blue-400">AUCTION_START_PRICE</div>
          <div className="text-green-400">1000000000000000000</div>
        </div>
      </div>

      <div className="absolute top-20 left-10 max-w-[750px] opacity-30 transform rotate-[-13deg] shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        <Image
          src="/c.jpg"
          alt="ABI Vision Interface Demo"
          width={750}
          height={450}
          className="w-full h-auto"
        />
      </div>
      {/* Redesigned main content area */}
      <div className="relative container mx-auto px-4">
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧区域：标题和按钮 */}
          <div className="space-y-8">
            <div className="relative inline-block">
              <h1 className="relative text-8xl font-bold tracking-tighter">
                <span className="inline-block bg-gradient-to-r from-black to-fuchsia-950 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                  ABI Vision
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            <p className="text-2xl text-gray-600">
              Visual Platform for Simplified Smart Contract Interaction
            </p>

            <div className="flex items-center gap-6">
              <AddContractModal />
              <Link href="https://github.com/qq919006380/abi-vision" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="group bg-white backdrop-blur-sm">
                  <SiGithub className="mr-2 h-4 w-4" />
                  GitHub
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 右侧区域：特性展示 */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl" />
            <div className="relative grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all duration-300
                    ${index % 2 === 0 ? 'lg:translate-x-12' : 'lg:-translate-x-12'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gray-100/50 border border-gray-200">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-medium text-gray-800 mb-2">{feature.title}</h2>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  );
}
