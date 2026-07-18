import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "HalalFlow",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Replace with your real project ID from WalletConnect Cloud
  chains: [celo, celoAlfajores],
  ssr: true, // If true, requires wrapped app in WagmiProvider
});
