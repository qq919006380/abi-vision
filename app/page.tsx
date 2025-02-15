"use client";
import { motion, useTransform, useMotionValue, useSpring, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 创建弹性动画效果
  const rotateX = useSpring(useTransform(mouseY, [0, dimensions.height], [15, -15]), {
    stiffness: 150,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [0, dimensions.width], [-15, 15]), {
    stiffness: 150,
    damping: 30
  });

  useEffect(() => {
    // 设置初始尺寸
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // 监听窗口尺寸变化
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => containerRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* 动态网格背景 */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 基础网格 */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(102, 102, 102, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(102, 102, 102, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            scale
          }}
        />

        {/* 动态光晕层 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${mouseX}px ${mouseY}px, 
                rgba(120, 119, 198, 0.15) 0%,
                rgba(120, 119, 198, 0.1) 20%,
                transparent 50%
              ),
              radial-gradient(circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.2) 0%,
                transparent 30%
              )
            `,
          }}
        />

        {/* 动态波纹效果 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              repeating-radial-gradient(
                circle at ${mouseX}px ${mouseY}px,
                transparent 0,
                transparent 40px,
                rgba(120, 119, 198, 0.05) 41px,
                transparent 42px
              )
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* 渐变背景 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.03) 0%,
                rgba(120, 119, 198, 0.05) 100%
              )
            `,
            filter: "blur(100px)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>


      <motion.div
        className="absolute top-20 right-10 w-[400px]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <motion.div
          className="bg-black rounded-lg p-4 text-white font-mono text-sm"
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 0.8, z: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ z: 50 }}
        >
          <div className="text-blue-400">balanceOf(address)</div>
          <div className="text-green-400">1000000000000000000</div>
          <div className="text-blue-400">allowance(address,address)</div>
          <div className="text-green-400">500000000000000000</div>
          <div className="text-blue-400">transfer(address,uint256)</div>
          <div className="text-green-400">true</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-40 right-[300px] w-[400px] h-[300px] opacity-80"
        initial={{ x: -100, opacity: 0, rotate: 0 }}
        animate={{ x: 0, opacity: 0.8, rotate: -8 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.05, rotate: -10 }}
      >
        <div className="bg-black rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-blue-400">ownerOf(tokenId)</div>
          <div className="text-green-400">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
          <div className="text-blue-400">tokenURI(tokenId)</div>
          <div className="text-green-400">"ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"</div>
          <div className="text-blue-400">approve(address,tokenId)</div>
          <div className="text-green-400">true</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-60 right-[150px] w-[400px] h-[300px] opacity-80"
        initial={{ y: 100, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 0.8, rotate: 12 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.05, rotate: 14 }}
      >
        <div className="bg-black rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-blue-400">AUCTION_DROP_INTERVAL</div>
          <div className="text-green-400">1200</div>
          <div className="text-blue-400">AUCTION_START_PRICE</div>
          <div className="text-green-400">1000000000000000000</div>
        </div>
      </motion.div>

      <div className="absolute top-20 left-10 max-w-[750px] opacity-30 transform rotate-[-13deg] shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        <Image
          src="/c.jpg"
          alt="ABI Vision Interface Demo"
          width={750}
          height={450}
          className="w-full h-auto"
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-8">
            <h1 className="relative text-8xl font-bold tracking-tighter overflow-hidden">
              {"ABI Vision".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-gradient-to-r from-black to-fuchsia-950 text-transparent bg-clip-text"
                  initial={{ y: 100, rotate: 10, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{
                    y: -20,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-2xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Visual Platform for Simplified Smart Contract Interaction
            </motion.p>

            <motion.div
              className="flex items-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AddContractModal />
              <Link href="https://github.com/qq919006380/abi-vision" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="group bg-white backdrop-blur-sm">
                  <SiGithub className="mr-2 h-4 w-4" />
                  GitHub
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl" />
            <div className="relative grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 动态装饰元素 */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)",
          x: useTransform(mouseX, [0, dimensions.width], [-250, 250]),
          y: useTransform(mouseY, [0, dimensions.height], [-250, 250])
        }}
      />
    </div>
  );
}
