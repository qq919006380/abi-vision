"use client"
import AddContractModal from "@/components/AddContractModal";
import { Database, Shield, Code, ArrowRight, Box } from "lucide-react";
import { SiGithub } from '@icons-pack/react-simple-icons';

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
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      
      {/* Main content */}
      <div className="relative container mx-auto px-4">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Hero Section */}
          <div className="text-center space-y-8 max-w-4xl">
            <div className="relative inline-block">
              <h1 className="relative text-8xl font-bold tracking-tighter">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                  ABI Vision
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              Visual Platform for Simplified Smart Contract Interaction
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
                className="group relative rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm p-6 hover:border-gray-300 transition-all duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-5 transition duration-300" />
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-lg bg-gray-100/50 border border-gray-200">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-medium text-gray-800">{feature.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  );
}
