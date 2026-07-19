(async () => {
  try {
    const claimRes = await fetch('https://celobuilders.xyz/auth/google/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "claimCode": "CELO-8FL3V-2LKC4-E3Y44-VQELQ-4SD5W-W" })
    });
    const claimData = await claimRes.json();
    console.log("Claim Response:", claimData);
    
    if (claimData.token) {
      require('fs').writeFileSync('token.txt', claimData.token);
    }
  } catch (e) {
    console.error(e);
  }
})();
