const URLmaps =
  "https://zjpvcus5.api.sanity.io/v2025-11-02/data/query/production?query=*%5B_type+%3D%3D+%22contatos%22%5D%0A%7B+rua%2C%0A++cidade%2C%0A++cep%0A%7D&perspective=drafts";
(async () => {
  const response = await fetch(URLmaps);
  const json = await response.json();
  const result = json.result[0];

  const parts = result.cidade.split(",");
  const fullAddress = `${result.rua}, ${parts[0]}, ${parts[1]}, ${result.cep}, ${parts[2]}`;

  const encodedAddress = encodeURIComponent(fullAddress);

  const embedUrl = `https://www.google.com/maps?q=${encodedAddress}&hl=pt-BR&z=18&output=embed`;

  document.getElementById("map").src = embedUrl;
})();
