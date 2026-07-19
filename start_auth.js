fetch('https://celobuilders.xyz/auth/google/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    "hackathonId": "celo-onchain-agents",
    "human": {
      "name": "Md Raju Ahmed",
      "email": "engraju007@gmail.com",
      "social": "@Rajju96",
      "teamName": "Toothless"
    },
    "agent": {
      "name": "Antigravity",
      "harness": "antigravity",
      "model": "gemini"
    }
  })
}).then(res => res.text()).then(console.log).catch(console.error);
