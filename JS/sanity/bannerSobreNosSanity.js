const URLhome = "https://zjpvcus5.api.sanity.io/v2025-12-01/data/query/production?query=*%5B_type+%3D%3D+%22imagem%22%5D%7B%0A++nome%2C%0A++descricao%2C%0A++%22imagem%22%3A+imagem.asset-%3Eurl%0A%7D&perspective=drafts";

async function renderBanner(result) {
  const anchorBanner = document.querySelector("#banner");
  anchorBanner.innerHTML = "";

  for (const data of result) {
    banner.style.backgroundImage = `url(${data.imagem})`;
    const BannerText = document.createElement('div');
    BannerText.classList.add('banner-text');
    BannerText.innerHTML = `
      <h2 id="titulo">${data.nome}</h2>
      <p id="descricao">${data.descricao}</p>
    `;
    anchorBanner.appendChild(BannerText);

  }
}

(async () => {
  const cachedSobre = localStorage.getItem("bannerData");
  let cachedData = null;

  try {
    if (cachedSobre) {
      cachedData = JSON.parse(cachedSobre);
      renderBanner(cachedData);
    }
  } catch (error) {
    console.warn("Failed to parse cached contact:", error);
  }

  try {
    const response = await fetch(URLhome);
    const json = await response.json();
    const result = json.result;

    if (JSON.stringify(result) !== JSON.stringify(cachedData)) {
      renderBanner(result);
      localStorage.setItem("bannerData", JSON.stringify(result));
    }
  } catch (error) {
    console.error("Cache error = " + error);
  }
})();

