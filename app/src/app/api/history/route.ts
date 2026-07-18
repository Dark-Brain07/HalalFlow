import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  
  if (!address) {
    return NextResponse.json({ success: false, error: 'No address provided' });
  }

  try {
    const USDM = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
    // We use the Blockscout API which does not require an API key and is standard for Celo
    const url = `https://explorer.celo.org/mainnet/api?module=account&action=tokentx&contractaddress=${USDM}&address=${address}&page=1&offset=10&sort=desc`;
    
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    
    if (data.status === "1" && data.result) {
      return NextResponse.json({ success: true, txs: data.result });
    }
    
    // If no transactions found or status is 0
    return NextResponse.json({ success: true, txs: [] });
  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch history' });
  }
}
