import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,

  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/z1O3p_4_g76STUQLdfjQ05PX3pYvHyjA",
      {
        batch: {
          batchSize: 2_000,
        },
      }
    ),
  },
});
