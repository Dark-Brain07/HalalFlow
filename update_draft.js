(async () => {
  try {
    const apiKey = 'sk-celo-hackathon_rgnixbUsQ_ZGUeGjsNwIoete0StAhG1APrAIwDAyA08';
    
    // First fetch the current draft
    const getRes = await fetch('https://celobuilders.xyz/submissions/me', {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    const currentData = await getRes.json();
    
    // Now update it
    const updatedData = {
      ...currentData,
      customFields: {
        ...currentData.customFields,
        erc8004Url: "https://8004scan.io/agents/celo/407",
        aigoraProfileUrl: "https://aigora.org/services/11142220_0x8004a818bfb912233c491871b3d84c89a494bd9e_407"
      }
    };
    
    const regRes = await fetch('https://celobuilders.xyz/submissions/me', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(updatedData)
    });
    const regData = await regRes.json();
    console.log("Updated Registration Response:", regData);
  } catch (e) {
    console.error(e);
  }
})();
