import { http, createConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  blast,
  arbitrum,
  optimism,
  polygon,
  base,
} from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "Abi Vision",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [mainnet, sepolia, blast, arbitrum, optimism, polygon, base],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [blast.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
});
