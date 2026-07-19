(async () => {
  try {
    const res = await fetch('https://celobuilders.xyz/hackathons/celo-onchain-agents/submission-fields');
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error(e);
  }
})();
