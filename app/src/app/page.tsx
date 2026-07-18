"use client";

import { useState, useEffect } from "react";
import { Send, HandCoins, ShieldCheck, Home, ArrowRight, CheckCircle2, History, Heart, Ban, QrCode, ChevronDown, AlertTriangle, XCircle, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
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
  const [pageIndex, setPageIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(recentTxs.length / ITEMS_PER_PAGE);
  const displayTxs = recentTxs.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE);

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
        const res = await fetch(`/api/history?address=${address}&t=${timestamp}`);
        const data = await res.json();
        
        if (data.success && data.txs) {
          setRecentTxs(data.txs);
        } else {
          setRecentTxs([]);
        }
      } catch (e) {
        console.error("Failed to fetch txs", e);
        setRecentTxs([]);
      } finally {
        setIsLoadingTxs(false);
      }
    };
    fetchTxs();
  }, [address, refreshKey]);

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
            <button 
              onClick={() => setRefreshKey(prev => prev + 1)}
              disabled={isLoadingTxs}
              className={`w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all ${isLoadingTxs ? 'animate-spin opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw size={12} />
            </button>
          </h3>
          {recentTxs.length > ITEMS_PER_PAGE && (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                disabled={pageIndex === 0}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setPageIndex(Math.min(totalPages - 1, pageIndex + 1))}
                disabled={pageIndex >= totalPages - 1}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {isLoadingTxs ? (
            <p className="text-sm text-slate-400 font-medium text-center py-4">Loading activity...</p>
          ) : recentTxs.length > 0 ? (
            displayTxs.map((tx, i) => {
              const isOut = tx.from.toLowerCase() === address?.toLowerCase();
              const amount = parseFloat(formatUnits(tx.value, 18)).toFixed(2);
              const date = new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString();
              
              return (
                <a 
                  key={i} 
                  href={`https://explorer.celo.org/mainnet/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                      {isOut ? "💸" : "📥"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm w-24 truncate group-hover:text-primary transition-colors">
                        {isOut ? `To ${tx.to.slice(0,6)}...` : `From ${tx.from.slice(0,6)}...`}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">{date}</p>
                    </div>
                  </div>
                  <p className={`font-black ${isOut ? 'text-slate-800' : 'text-green-600'}`}>
                    {isOut ? "-" : "+"}${amount}
                  </p>
                </a>
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
  const [txState, setTxState] = useState<'idle' | 'loading' | 'success' | 'error' | 'approveSuccess'>('idle');
  const [sliderVal, setSliderVal] = useState(0);
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
    { name: "Global Relief Fund", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" }
  ];

  if (txState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16 animate-in fade-in duration-300">
        <div className="w-16 h-16 border-8 border-slate-200 border-t-[#87dbfb] rounded-full animate-spin"></div>
        <h3 className="text-xl font-black text-slate-800">Processing...</h3>
        <p className="text-slate-500 font-bold text-sm">Please wait while we confirm on-chain.</p>
      </div>
    );
  }

  if (txState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-400 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] rounded-full flex items-center justify-center text-white">
          <CheckCircle2 size={48} className="text-slate-900" />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-slate-800 mb-2">Sent!</h3>
          <p className="text-slate-500 font-bold">Your remittance was successful.</p>
        </div>
        <button 
          onClick={() => { setTxState('idle'); setAmount(""); setSliderVal(0); setNeedsApproval(true); }}
          className="bg-white text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full h-12 px-8 font-black"
        >
          Send Another
        </button>
      </div>
    );
  }

  if (txState === 'approveSuccess') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-400 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] rounded-full flex items-center justify-center text-white">
          <CheckCircle2 size={48} className="text-slate-900" />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-slate-800 mb-2">Approved!</h3>
          <p className="text-slate-500 font-bold">You can now proceed to send your funds.</p>
        </div>
        <button 
          onClick={() => { setTxState('idle'); setNeedsApproval(false); }}
          className="bg-white text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full h-12 px-8 font-black flex items-center gap-2"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (txState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-rose-400 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] rounded-full flex items-center justify-center text-white">
          <XCircle size={48} className="text-slate-900" />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-slate-800 mb-2">Failed</h3>
          <p className="text-slate-500 font-bold">Something went wrong with the transaction.</p>
        </div>
        <button 
          onClick={() => { setTxState('idle'); setSliderVal(0); }}
          className="bg-white text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full h-12 px-8 font-black"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-in slide-in-from-right-4 duration-500 pb-8">
      <div className="px-2 mb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ffeb85] border-4 border-slate-900 rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#1a1a1a]">
            <Send className="text-slate-900 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          Send Remittance
        </h2>
      </div>

      {/* Recipient Box */}
      <div className="bg-[#ffeb85] rounded-3xl sm:rounded-[2rem] p-4 sm:p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a]">
        <label className="block text-xs font-black text-slate-800 mb-1.5 sm:mb-2 uppercase tracking-wide">Recipient Address</label>
        <div className="flex gap-2 mb-2 sm:mb-3">
          <input 
            type="text" 
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..." 
            className="w-full min-w-0 bg-white border-2 border-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-slate-800 placeholder-slate-400 font-mono text-sm focus:outline-none"
          />
          <button className="bg-white border-2 border-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-slate-900 hover:bg-slate-100 transition-colors shrink-0 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-white border-2 border-slate-900 rounded-xl sm:rounded-2xl p-2 max-h-32 sm:max-h-40 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-slate-400 px-3 py-1 uppercase tracking-wider">Saved & Verified</p>
          {[...savedAddresses, ...verifiedCharities].map((item, i) => (
            <button key={`saved-${i}`} onClick={() => setRecipient(item.address)} className="w-full text-left px-3 py-1.5 sm:py-2 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors">
              <p className="text-xs sm:text-sm font-bold text-slate-800">{item.name}</p>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 truncate">{item.address}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Box */}
      <div className="bg-white rounded-3xl sm:rounded-[2rem] p-4 sm:p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a]">
        <label className="block text-xs font-black text-slate-800 mb-1.5 sm:mb-2 uppercase tracking-wide">Amount (USDm)</label>
        <div className="relative mb-3 sm:mb-4">
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl sm:text-2xl">$</span>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00" 
            className="w-full min-w-0 bg-slate-50 border-2 border-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 pl-8 sm:pl-9 text-xl sm:text-2xl font-black text-slate-800 focus:outline-none focus:bg-white transition-colors"
          />
        </div>

        <div className="bg-[#a5ebd3] p-3 sm:p-4 rounded-xl sm:rounded-2xl space-y-1.5 sm:space-y-2 text-xs sm:text-sm border-2 border-slate-900">
          <div className="flex justify-between font-bold text-slate-700">
            <span>Send Amount</span>
            <span>${amount || "0.00"}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-700">
            <span>Flat Network Fee</span>
            <span>$0.50</span>
          </div>
          <div className="h-px w-full bg-slate-900/10 my-1.5 sm:my-2"></div>
          <div className="flex justify-between font-black text-slate-900 text-base sm:text-lg">
            <span>Total to deduct</span>
            <span>${amount ? (parseFloat(amount) + 0.50).toFixed(2) : "0.50"}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
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
                setTxState('approveSuccess');
              },
              onError: (err) => console.error("Approval Failed:", err)
            });
          }}
          disabled={isApprovePending}
          className="w-2/3 mx-auto h-12 bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-3xl sm:rounded-[2rem] font-black text-sm sm:text-base flex justify-center items-center gap-2 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0_0_#1a1a1a]"
        >
          {isApprovePending ? "Approving..." : "Step 1: Approve USDm"}
        </button>
      ) : (
        <div className="relative w-2/3 mx-auto h-12 bg-[#34d399] rounded-full border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] overflow-hidden group">
          
          {/* Text */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none font-black text-slate-900 text-xs sm:text-sm z-10">
            Swipe to Send
          </div>

          {/* Swipe Thumb */}
          <div 
            className="absolute top-1 flex items-center justify-center w-[32px] h-[32px] bg-white text-slate-900 rounded-xl z-10 pointer-events-none transition-none shadow-sm"
            style={{ 
              left: `calc(4px + ${sliderVal}% - ${sliderVal * 40 / 100}px)`
            }}
          >
            <ArrowRight size={18} className="text-slate-900" />
          </div>

          {/* Invisible Range Input */}
          <input 
            type="range" 
            min="0" max="100" 
            value={sliderVal}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setSliderVal(val);
              if (val > 95) {
                setSliderVal(100);
                if (!recipient || !amount) return;
                setTxState('loading');
                writeContract({
                  address: REMITTANCE_ROUTER_ADDRESS as `0x${string}`,
                  abi: routerAbi,
                  functionName: 'sendRemittance',
                  args: [
                    USDM_ADDRESS as `0x${string}`,
                    recipient as `0x${string}`,
                    parseUnits(amount, 18),
                    "0x"
                  ]
                }, {
                  onSuccess: () => {
                    setTxState('success');
                  },
                  onError: (err) => {
                    console.error("Tx Failed:", err);
                    setTxState('error');
                  }
                });
              }
            }}
            onMouseUp={() => { if(sliderVal < 95) setSliderVal(0); }}
            onTouchEnd={() => { if(sliderVal < 95) setSliderVal(0); }}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>
      )}
    </div>
  );
}

function ZakatTab() {
  const { address } = useAccount();
  const [approved, setApproved] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [error, setError] = useState("");
  const [defaultZakatAddress, setDefaultZakatAddress] = useState("0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf");
  
  const { writeContract, isPending } = useWriteContract();

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
    { name: "Global Relief Fund", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" }
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

  const handleFinalConfirm = () => {
    if (saveAsDefault) {
      localStorage.setItem("defaultZakatRecipient", recipient);
      setDefaultZakatAddress(recipient);
    }
    
    writeContract({
      address: USDM_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [
        recipient as `0x${string}`,
        parseUnits(zakatDue, 18)
      ]
    }, {
      onSuccess: () => {
        setApproved(true);
        setIsConfirming(false);
      },
      onError: (err) => {
        console.error(err);
        setError("Transaction failed.");
      }
    });
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
              disabled={isPending}
              className="flex-1 bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-full py-4 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0_0_#1a1a1a]"
            >
              {isPending ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-in slide-in-from-right-4 duration-500 pb-8">
      <div className="px-2 mb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ffa3c1] border-4 border-slate-900 rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#1a1a1a]">
            <Heart className="text-slate-900 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          Zakat Calc
        </h2>
      </div>

      {/* Balances Card */}
      <div className="bg-[#ffa3c1] rounded-3xl sm:rounded-[2rem] p-4 sm:p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a]">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-left">
          <div className="bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Eligible Balance</p>
            <p className="text-sm sm:text-base font-bold text-slate-800">${formattedBalance}</p>
          </div>
          <div className="bg-[#ffeb85] border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <p className="text-[9px] sm:text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">Nisab Threshold</p>
            <p className="text-sm sm:text-base font-bold text-slate-900">$980.00</p>
          </div>
        </div>
        
        <div className="bg-white border-2 border-slate-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center">
          <span className="bg-[#d0a6ff] text-slate-900 border border-slate-900 text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full mb-1 sm:mb-2 uppercase tracking-wide">2.5% Due</span>
          <p className="text-3xl sm:text-4xl font-black text-rose-600 mb-1">${zakatDue}</p>
        </div>
      </div>

      {/* Recipient Card */}
      <div className="bg-white rounded-3xl sm:rounded-[2rem] p-4 sm:p-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a]">
        <label className="block text-xs font-black text-slate-800 mb-1.5 sm:mb-2 uppercase tracking-wide">Send Zakat to</label>
        <div className="flex gap-2 mb-2 sm:mb-3">
          <input 
            type="text" 
            value={recipient}
            onChange={(e) => { setRecipient(e.target.value); setError(""); }}
            placeholder="0x..." 
            className={`w-full min-w-0 bg-slate-50 border-2 ${error ? 'border-rose-400' : 'border-slate-900'} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-slate-800 placeholder-slate-400 font-mono text-xs sm:text-sm focus:bg-white focus:outline-none transition-colors`}
          />
          <button className="bg-white border-2 border-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-slate-900 hover:bg-slate-100 transition-colors shrink-0 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </button>
        </div>
        {error && <p className="text-rose-500 text-[10px] sm:text-xs font-bold mt-1 mb-2">{error}</p>}
        
        <div className="bg-white border-2 border-slate-900 rounded-xl sm:rounded-2xl p-2 max-h-32 sm:max-h-40 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-slate-400 px-3 py-1 uppercase tracking-wider">Verified Charities & Saved</p>
          {[...verifiedCharities, ...savedAddresses].map((item, i) => (
            <button key={`charity-${i}`} onClick={() => { setRecipient(item.address); setError(""); }} className="w-full text-left px-3 py-1.5 sm:py-2 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors">
              <p className="text-xs sm:text-sm font-bold text-slate-800">{item.name}</p>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 truncate">{item.address}</p>
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer mt-3 sm:mt-4 mb-1 sm:mb-2">
          <input 
            type="checkbox" 
            checked={saveAsDefault}
            onChange={(e) => setSaveAsDefault(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary accent-slate-900" 
          />
          <span className="text-[10px] sm:text-xs font-bold text-slate-600">Save as my default Zakat recipient</span>
        </label>
      </div>

      {/* Action Button */}
      {!approved ? (
        <button 
          onClick={handleApprove}
          className="w-2/3 mx-auto h-12 bg-[#87dbfb] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-[0px_0px_0_0_#1a1a1a] transition-all rounded-3xl sm:rounded-[2rem] font-black text-sm sm:text-base flex justify-center items-center gap-2"
        >
          Review Payment
        </button>
      ) : (
        <button 
          disabled
          className="w-2/3 mx-auto h-12 bg-[#a5ebd3] text-slate-900 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a] rounded-3xl sm:rounded-[2rem] font-black text-sm sm:text-base flex justify-center items-center gap-2 cursor-default"
        >
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> Settled via x402
        </button>
      )}
    </div>
  );
}

function RegistryTab() {
  const [sadaqahEnabled, setSadaqahEnabled] = useState(true);

  const assets = [
    { name: "USDm", status: "Halal", desc: "Fiat-backed stablecoin, no interest yields." },
    { name: "USDC", status: "Halal", desc: "Transparent reserves." },
    { name: "EURm", status: "Halal", desc: "Fiat-backed stablecoin." },
    { name: "stCELO", status: "Haram", desc: "Interest-bearing staking derivative." },
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-8">
      <div className="bg-[#87dbfb] rounded-[2rem] p-6 border-4 border-slate-900 shadow-[4px_4px_0_0_#1a1a1a]">
        <h3 className="font-bold text-slate-900 mb-2 text-lg">Sadaqah (Round-ups)</h3>
        <p className="text-slate-700 text-sm font-medium mb-4">Automatically round up remittances to the nearest dollar to donate.</p>
        
        <div className="flex items-center justify-between bg-white border-2 border-slate-900 shadow-[2px_2px_0_0_#1a1a1a] p-4 rounded-2xl">
          <div className="font-bold text-slate-800 text-sm">Enable Round-ups</div>
          <div 
            onClick={() => setSadaqahEnabled(!sadaqahEnabled)}
            className={`w-16 h-8 rounded-full border-2 border-slate-900 flex items-center p-0.5 cursor-pointer transition-colors duration-300 ease-in-out shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] ${
              sadaqahEnabled ? 'bg-[#34d399]' : 'bg-slate-200'
            }`}
          >
            <div 
              className={`w-6 h-6 bg-white border-2 border-slate-900 rounded-full shadow-[1px_1px_0_0_#1a1a1a] transition-transform duration-300 ease-in-out ${
                sadaqahEnabled ? 'translate-x-8' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
      </div>

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
