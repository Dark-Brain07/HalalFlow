"use client";

import { useState, useEffect } from "react";
import { Send, HandCoins, ShieldCheck, Home, ArrowRight, CheckCircle2, History, Heart, Ban, QrCode, ChevronDown, AlertTriangle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect, useAccount, useWriteContract, useReadContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { parseUnits, formatUnits } from "viem";

const REMITTANCE_ROUTER_ADDRESS = "0xACcfC2339645E0E18bD7B5a6FBB1C427dfdCED1e";
const USDM_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // Celo Mainnet cUSD (USDm)

const routerAbi = [
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "attributionTag", type: "bytes" }
    ],
    name: "sendRemittance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

const erc20Abi = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

type Tab = "home" | "remit" | "zakat" | "registry";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-transparent relative pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-end px-6 pt-12 pb-4">
        <WalletHeader />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto px-4 pb-8 space-y-6">
        {activeTab === "home" && <DashboardTab onNavigate={setActiveTab} />}
        {activeTab === "remit" && <RemitTab />}
        {activeTab === "zakat" && <ZakatTab />}
        {activeTab === "registry" && <RegistryTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-full border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] p-2 flex justify-between items-center z-50">
        <NavButton icon={<Home size={22} />} active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavButton icon={<Send size={22} />} active={activeTab === "remit"} onClick={() => setActiveTab("remit")} />
        <NavButton icon={<Heart size={22} />} active={activeTab === "zakat"} onClick={() => setActiveTab("zakat")} />
        <NavButton icon={<ShieldCheck size={22} />} active={activeTab === "registry"} onClick={() => setActiveTab("registry")} />
      </div>
    </div>
  );
}

function NavButton({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition-all duration-300 flex-1 flex justify-center ${active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
    >
      {icon}
    </button>
  );
}

// --- Wallet Connect Component ---

function WalletHeader() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Type cast for window.ethereum
    const ethereum = typeof window !== "undefined" ? (window as any).ethereum : undefined;
    
    if (ethereum?.isMiniPay) {
      setIsMiniPay(true);
      if (!isConnected) {
        connect({ connector: injected() });
      }
    }
  }, [connect, isConnected]);

  if (!mounted) return <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse"></div>;

  if (isMiniPay) {
    return (
      <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-sm font-bold text-slate-700">
          {address ? `${address.slice(0,6)}...${address.slice(-4)}` : "Connecting..."}
        </span>
      </div>
    );
  }

  // Fallback to RainbowKit for Valora, desktop, MetaMask, etc.
  return <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />;
}

// --- Tabs Components ---

function DashboardTab({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { address } = useAccount();
  const [recentTxs, setRecentTxs] = useState<any[]>([]);
  const [isLoadingTxs, setIsLoadingTxs] = useState(false);

  const { data: balanceData } = useReadContract({
    address: USDM_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  useEffect(() => {
    if (!address) return;
    const fetchTxs = async () => {
      setIsLoadingTxs(true);
      try {
        const timestamp = new Date().getTime(); // cache buster
        const res = await fetch(`https://explorer.celo.org/mainnet/api?module=account&action=tokentx&contractaddress=${USDM_ADDRESS}&address=${address}&page=1&offset=5&sort=desc&t=${timestamp}`, {
          cache: 'no-store'
        });
        const data = await res.json();
        if (data.status === "1" && data.result) {
          setRecentTxs(data.result);
        }
      } catch (e) {
        console.error("Failed to fetch txs", e);
      } finally {
        setIsLoadingTxs(false);
      }
    };
    fetchTxs();
  }, [address]);

  const formattedBalance = balanceData !== undefined 
    ? parseFloat(formatUnits(balanceData, 18)).toFixed(2)
    : "0.00";

  return (
    <div className="flex flex-col flex-1 space-y-4 animate-in fade-in duration-500 pb-8">
      <div className="bg-[#ffeb85] rounded-[2rem] p-6 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] text-center relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <ShieldCheck size={80} />
        </div>
        <p className="text-slate-500 font-medium mb-1">Total Balance</p>
        <h2 className="text-4xl font-extrabold text-slate-800 mb-2">${formattedBalance}</h2>
        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold border border-green-100">
          <CheckCircle2 size={16} className="text-green-500" />
          100% Halal Assets
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate("remit")}
          className="bg-[#87dbfb] rounded-[2rem] p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] text-left active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all"
        >
          <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center mb-3">
            <Send size={20} className="text-slate-800" />
          </div>
          <h3 className="font-bold text-slate-800">Send</h3>
          <p className="text-sm text-slate-700 font-medium opacity-80">Flat fee transfer</p>
        </button>
        
        <button 
          onClick={() => onNavigate("zakat")}
          className="bg-[#ffa3c1] rounded-[2rem] p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] text-left active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all"
        >
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mb-3">
            <Heart size={20} className="text-rose-500" />
          </div>
          <h3 className="font-bold text-slate-800">Zakat</h3>
          <p className="text-sm text-slate-500 font-medium">Due in 4 days</p>
        </button>
      </div>

      <div className="flex-1 bg-white rounded-[2rem] p-6 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] flex flex-col">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <History size={18} className="text-slate-400" /> Recent Activity
          </h3>
          <button className="text-sm font-semibold text-secondary">See all</button>
        </div>
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {isLoadingTxs ? (
            <p className="text-sm text-slate-400 font-medium text-center py-4">Loading activity...</p>
          ) : recentTxs.length > 0 ? (
            recentTxs.map((tx, i) => {
              const isOut = tx.from.toLowerCase() === address?.toLowerCase();
              const amount = parseFloat(formatUnits(tx.value, 18)).toFixed(2);
              const date = new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString();
              
              return (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl">
                      {isOut ? "💸" : "📥"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm truncate w-24">
                        {isOut ? `To ${tx.to.slice(0,6)}...` : `From ${tx.from.slice(0,6)}...`}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">{date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${isOut ? 'text-slate-800' : 'text-green-600'}`}>
                    {isOut ? "-" : "+"}${amount}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-400 font-medium text-center py-4">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function RemitTab() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [needsApproval, setNeedsApproval] = useState(true); // Simplified for MVP demo
  const [defaultZakatAddress, setDefaultZakatAddress] = useState("0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf");
  
  const { writeContract, isPending } = useWriteContract();
  const { writeContract: writeApprove, isPending: isApprovePending } = useWriteContract();

  useEffect(() => {
    const saved = localStorage.getItem("defaultZakatRecipient");
    if (saved) setDefaultZakatAddress(saved);
  }, []);

  const savedAddresses = [
    { name: "My Default Zakat", address: defaultZakatAddress }
  ];
  const verifiedCharities = [
    { name: "Global Relief Fund", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" },
    { name: "Water Project", address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" }
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-8">
      <div className="bg-[#ffeb85] rounded-[2rem] p-6 shadow-sm relative z-20">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
          <Send className="text-slate-900" /> Send Remittance
        </h2>

        <div className="mb-6 relative z-30">
          <label className="block text-sm font-bold text-slate-700 mb-2">Recipient Address</label>
          <div className="flex gap-2 mb-2">
            <input 
              type="text" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..." 
              className="w-full bg-white border-2 border-slate-900 rounded-2xl p-4 text-slate-800 placeholder-slate-400 font-mono text-sm focus:outline-none"
            />
            <button className="bg-white border-2 border-slate-900 p-4 rounded-2xl text-slate-900 hover:bg-slate-100 transition-colors shrink-0 flex items-center justify-center">
              <QrCode size={20} />
            </button>
          </div>
          
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-2 max-h-48 overflow-y-auto mt-2">
            <p className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Saved</p>
            {savedAddresses.map((item, i) => (
              <button key={`saved-${i}`} onClick={() => setRecipient(item.address)} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors">
                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                <p className="text-xs font-mono text-slate-500 truncate">{item.address}</p>
              </button>
            ))}
            <div className="h-px w-full bg-slate-200 my-2"></div>
            <p className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Verified Charities</p>
            {verifiedCharities.map((item, i) => (
              <button key={`charity-${i}`} onClick={() => setRecipient(item.address)} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors">
                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                <p className="text-xs font-mono text-slate-500 truncate">{item.address}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Amount (USDm)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-white border-2 border-slate-900 rounded-2xl p-4 pl-8 text-2xl font-bold text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-[#a5ebd3] p-4 rounded-2xl space-y-2 text-sm border-2 border-slate-900 mt-6 mb-6">
          <div className="flex justify-between font-medium text-slate-600">
            <span>Send Amount</span>
            <span>${amount || "0.00"}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-600">
            <span>Transparent Flat Fee</span>
            <span className="font-bold text-slate-800">$0.50</span>
          </div>
          <div className="h-px w-full bg-slate-200 my-2"></div>
          <div className="flex justify-between font-bold text-slate-800 text-base">
            <span>Total to deduct</span>
            <span>${amount ? (parseFloat(amount) + 0.50).toFixed(2) : "0.50"}</span>
          </div>
        </div>

        {needsApproval ? (
          <button 
            onClick={() => {
              if (!amount) return;
              const totalRequired = (parseFloat(amount) + 0.50).toString();
              writeApprove({
                address: USDM_ADDRESS as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [
                  REMITTANCE_ROUTER_ADDRESS as `0x${string}`,
                  parseUnits(totalRequired, 18)
                ]
              }, {
                onSuccess: () => {
                  alert("Approval successful! You can now send funds.");
                  setNeedsApproval(false);
                },
                onError: (err) => console.error("Approval Failed:", err)
              });
            }}
            disabled={isApprovePending}
            className="w-full bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0_0_#1a1a1a]"
          >
            {isApprovePending ? "Approving in Wallet..." : "Step 1: Approve USDm"}
          </button>
        ) : (
          <button 
            onClick={() => {
              if (!recipient || !amount) return;
              writeContract({
                address: REMITTANCE_ROUTER_ADDRESS as `0x${string}`,
                abi: routerAbi,
                functionName: 'sendRemittance',
                args: [
                  USDM_ADDRESS as `0x${string}`,
                  recipient as `0x${string}`,
                  parseUnits(amount, 18),
                  "0x" // Attribution tag placeholder
                ]
              }, {
                onSuccess: () => {
                  alert("Transaction Sent!");
                  setNeedsApproval(true); // reset for demo
                },
                onError: (err) => console.error("Tx Failed:", err)
              });
            }}
            disabled={isPending}
            className="w-full bg-gradient-to-r from-[#87dbfb] to-[#d0a6ff] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0_0_#1a1a1a]"
          >
            {isPending ? "Confirm in Wallet..." : <>Step 2: Send Transfer <ArrowRight size={20} /></>}
          </button>
        )}
      </div>
    </div>
  );
}

function ZakatTab() {
  const { address } = useAccount();
  const [approved, setApproved] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [sadaqahEnabled, setSadaqahEnabled] = useState(true);
  const [error, setError] = useState("");
  const [defaultZakatAddress, setDefaultZakatAddress] = useState("0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf");

  useEffect(() => {
    const saved = localStorage.getItem("defaultZakatRecipient");
    if (saved) setDefaultZakatAddress(saved);
  }, []);

  const { data: balanceData } = useReadContract({
    address: USDM_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const rawBalance = balanceData !== undefined ? parseFloat(formatUnits(balanceData, 18)) : 0;
  const formattedBalance = rawBalance.toFixed(2);
  const zakatDue = (rawBalance * 0.025).toFixed(2);

  const verifiedCharities = [
    { name: "Global Relief Fund", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" },
    { name: "Water Project", address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" }
  ];

  const savedAddresses = [
    { name: "My Default Zakat", address: defaultZakatAddress }
  ];

  const handleApprove = () => {
    setError("");
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      setError("Invalid Celo address format.");
      return;
    }
    setIsConfirming(true);
  };

  const handleFinalConfirm = async () => {
    if (saveAsDefault) {
      localStorage.setItem("defaultZakatRecipient", recipient);
      setDefaultZakatAddress(recipient);
    }
    
    setIsProcessing(true);
    try {
      const res = await fetch('/api/zakat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress: address || "0xAnonymous",
          recipientAddress: recipient,
          amount: zakatDue
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setApproved(true);
        setIsConfirming(false);
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-8">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Confirm Payment</h2>
          <p className="text-rose-500 text-sm font-bold mb-6">Transactions can't be reversed — double-check this address.</p>
          
          <div className="bg-slate-50 p-4 rounded-2xl mb-6 text-left break-all border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recipient Address</p>
            <p className="font-mono text-sm font-bold text-slate-800">{recipient}</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsConfirming(false)}
              className="flex-1 bg-[#ffeb85] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleFinalConfirm}
              disabled={isProcessing}
              className="flex-1 bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0_0_#1a1a1a]"
            >
              {isProcessing ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-8">
      <div className="bg-[#ffa3c1] rounded-[2rem] p-6 shadow-sm relative overflow-visible z-20">
        
        <div className="relative z-10 text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4 border-4 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] text-2xl">
            🤲
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Zakat Calculator</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6 mt-4 text-left">
            <div className="bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-4 rounded-2xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Eligible Balance</p>
              <p className="font-bold text-slate-800">${formattedBalance}</p>
            </div>
            <div className="bg-[#ffeb85] border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-4 rounded-2xl">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Nisab Threshold</p>
              <p className="font-bold text-slate-900">$980.00</p>
            </div>
          </div>
          
          <div className="bg-white border-2 border-slate-900 p-5 rounded-2xl flex flex-col items-center">
            <span className="bg-[#d0a6ff] text-slate-900 border border-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-2">2.5% Due</span>
            <p className="text-3xl font-black text-rose-600 mb-1">${zakatDue}</p>
          </div>
        </div>

        <div className="text-left mb-6 relative z-30">
          <label className="block text-sm font-bold text-slate-700 mb-2">Send Zakat to</label>
          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..." 
                className={`w-full bg-slate-50 border-2 ${error ? 'border-rose-400' : 'border-transparent'} rounded-2xl p-4 text-slate-800 placeholder-slate-400 font-mono text-sm focus:ring-2 focus:ring-primary outline-none`}
              />
            </div>
            <button className="bg-slate-100 p-4 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors shrink-0 flex items-center justify-center">
              <QrCode size={20} />
            </button>
          </div>
          {error && <p className="text-rose-500 text-xs font-bold mt-1">{error}</p>}
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2 max-h-48 overflow-y-auto mt-2">
            <p className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Saved</p>
            {savedAddresses.map((item, i) => (
              <button key={`saved-${i}`} onClick={() => { setRecipient(item.address); setError(""); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors">
                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                <p className="text-xs font-mono text-slate-500 truncate">{item.address}</p>
              </button>
            ))}
            <div className="h-px w-full bg-slate-200 my-2"></div>
            <p className="text-xs font-bold text-slate-400 px-3 py-1 uppercase">Verified Charities</p>
            {verifiedCharities.map((item, i) => (
              <button key={`charity-${i}`} onClick={() => { setRecipient(item.address); setError(""); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors">
                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                <p className="text-xs font-mono text-slate-500 truncate">{item.address}</p>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-3">
            <input 
              type="checkbox" 
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" 
            />
            <span className="text-sm font-medium text-slate-600">Save as my default Zakat recipient</span>
          </label>
        </div>

        {!approved ? (
          <button 
            onClick={handleApprove}
            className="w-full bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg"
          >
            Review Payment
          </button>
        ) : (
          <button 
            disabled
            className="w-full bg-[#a5ebd3] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] rounded-full py-4 font-bold text-lg flex justify-center items-center gap-2 cursor-default"
          >
            <CheckCircle2 size={20} /> Settled via x402
          </button>
        )}
      </div>

      <div className="bg-[#87dbfb] rounded-[2rem] p-6 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] z-10 relative mt-4">
        <h3 className="font-bold text-slate-900 mb-2">Sadaqah (Round-ups)</h3>
        <p className="text-slate-700 text-sm font-medium mb-4">Automatically round up remittances to the nearest dollar to donate.</p>
        
        <div className="flex items-center justify-between bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-4 rounded-2xl">
          <div className="font-bold text-slate-800">Enable Round-ups</div>
          <div 
            onClick={() => setSadaqahEnabled(!sadaqahEnabled)}
            className={`w-14 h-7 rounded-full border-2 border-slate-900 relative cursor-pointer transition-colors duration-300 ease-in-out ${
              sadaqahEnabled ? 'bg-[#ffeb85]' : 'bg-slate-300'
            }`}
          >
            <div 
              className={`w-6 h-6 bg-white border-2 border-slate-900 rounded-full absolute -top-0.5 -left-0.5 transition-transform duration-300 ease-in-out shadow-sm ${
                sadaqahEnabled ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistryTab() {
  const assets = [
    { name: "USDm", status: "Halal", desc: "Fiat-backed stablecoin, no interest yields." },
    { name: "USDC", status: "Halal", desc: "Transparent reserves." },
    { name: "EURm", status: "Halal", desc: "Fiat-backed stablecoin." },
    { name: "stCELO", status: "Haram", desc: "Interest-bearing staking derivative." },
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-secondary text-white rounded-[2rem] p-6 shadow-sm">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-md">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-extrabold mb-1">Halal Registry</h2>
        <p className="text-white/80 text-sm font-medium">On-chain allowlist for compliant tokens and pools.</p>
      </div>

      <div className="space-y-3">
        {assets.map((asset, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{asset.name}</h3>
              <p className="text-xs font-medium text-slate-500">{asset.desc}</p>
            </div>
            {asset.status === "Halal" ? (
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold">
                <CheckCircle2 size={14} /> Halal
              </div>
            ) : (
              <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full text-xs font-bold">
                <Ban size={14} /> Haram
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
