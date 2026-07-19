(async () => {
  try {
    const res = await fetch('https://celobuilders.xyz/hackathons');
    const data = await res.json();
    data.forEach(h => console.log(h.slug, h.endsAt));
  } catch(e) {
    console.error(e);
  }
})();
