(async () => {
  try {
    const claimRes = await fetch('https://celobuilders.xyz/auth/google/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "claimCode": "CELO-8NET3-5WPSP-7MDDP-STB6Y-92YY4-R" })
    });
    const claimData = await claimRes.json();
    console.log("Claim Response:", claimData);
    
    if (!claimData.apiKey) throw new Error("No API key returned");

    const tracksRes = await fetch('https://celobuilders.xyz/hackathons/agentic-payments-defai/tracks');
    const tracksData = await tracksRes.json();
    const firstTrackSlug = tracksData.length > 0 ? tracksData[0].slug : null;

    const regRes = await fetch('https://celobuilders.xyz/submissions/me', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + claimData.apiKey
      },
      body: JSON.stringify({
        "projectName": "HalalFlow",
        "githubUrl": "https://github.com/Dark-Brain07/HalalFlow",
        "trackIds": firstTrackSlug ? [firstTrackSlug] : [],
        "customFields": {
          "telegram": "@Rajju96"
        }
      })
    });
    const regData = await regRes.json();
    console.log("Registration Response:", regData);
  } catch (e) {
    console.error(e);
  }
})();
