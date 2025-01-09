"use client"
import AddContractModal from "@/components/AddContractModal";
import { Database, Shield, Code, ArrowRight, Box } from "lucide-react";
import { SiGithub } from '@icons-pack/react-simple-icons';

import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "开源透明",
      description: "完全开源的代码库，支持社区审计和贡献"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "安全可靠",
      description: "数据完全存储在本地，无需担心隐私泄露"
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: "简单易用",
      description: "直观的可视化界面，让智能合约交互更简单"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      
      {/* 主要内容 */}
      <div className="relative container mx-auto px-4">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Hero Section */}
          <div className="text-center space-y-8 max-w-4xl">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
              <h1 className="relative text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                ABI Vision
              </h1>
            </div>
            
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              简化智能合约交互的可视化平台
            </p>

            <div className="flex items-center justify-center gap-6 pt-8">
              <AddContractModal />
              <Link
                href="https://github.com/qq919006380/abi-vision"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="group bg-white backdrop-blur-sm"
                >
                  <SiGithub className="mr-2 h-4 w-4" />
                  GitHub 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm p-6 hover:border-gray-700 transition-all duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-medium text-gray-200">{feature.title}</h2>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  );
}
