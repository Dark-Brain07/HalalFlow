(async () => {
  try {
    const regRes = await fetch('https://celobuilders.xyz/submissions/me', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-celo-hackathon_RuCY167P8hhslyDfHG5pWEJkICr2IvvF5vjZPLYPdZ8'
      },
      body: JSON.stringify({
        "projectName": "HalalFlow",
        "githubUrl": "https://github.com/Dark-Brain07/HalalFlow",
        "trackIds": ["best-agent"]
      })
    });
    const regData = await regRes.json();
    console.log("Registration Response:", regData);
  } catch (e) {
    console.error(e);
  }
})();
