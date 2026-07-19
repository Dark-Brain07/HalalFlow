import { KeyPairSigner, RpcDevnet, SolanaRpcApiDevnet, RpcMainnet, SolanaRpcApiMainnet } from '@solana/kit';

type SvmConnectedClient = RpcDevnet<SolanaRpcApiDevnet> | RpcMainnet<SolanaRpcApiMainnet>;
type SvmSigner = KeyPairSigner;
/**
 * Creates a public client configured for the specified SVM network
 *
 * @param network - The network to connect to
 * @returns A public client instance connected to the specified chain
 */
declare function createSvmConnectedClient(network: string): SvmConnectedClient;
/**
 * Creates a Solana signer from a private key.
 *
 * @param privateKey - The base58 encoded private key to create a signer from.
 * @returns A Solana signer.
 */
declare function createSignerFromBase58(privateKey: string): Promise<KeyPairSigner>;
/**
 * Checks if the given wallet is a solana KeyPairSigner wallet.
 *
 * @param wallet - The object wallet to check.
 * @returns True if the wallet is a solana KeyPairSigner wallet, false otherwise.
 */
declare function isSignerWallet(wallet: SvmSigner): wallet is SvmSigner;

export { type SvmSigner as S, type SvmConnectedClient as a, createSvmConnectedClient as b, createSignerFromBase58 as c, isSignerWallet as i };
