import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { 
  bitgetWallet, 
  metaMaskWallet, 
  rainbowWallet, 
  walletConnectWallet 
} from "@rainbow-me/rainbowkit/wallets";
import { celo, celoAlfajores } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "HalalFlow",
  // A working Project ID is required for the wallet popup to load correctly!
  projectId: "43760ed6d38e6e5898717af0155b1ffc", 
  chains: [celo, celoAlfajores],
  ssr: true,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        bitgetWallet, // Explicitly add Bitget!
        metaMaskWallet, 
        rainbowWallet, 
        walletConnectWallet
      ],
    },
  ],
});
