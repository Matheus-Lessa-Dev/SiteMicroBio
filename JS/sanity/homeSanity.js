const URLhome =
  "https://zjpvcus5.api.sanity.io/v2025-11-10/data/query/production?query=+*%5B_type%3D%3D%22noticias%22%5D%7B%0A++++titulo%2C%0A++++++descricao%2C%0A++++++imagem%0A++%7D&perspective=drafts";

async function renderNews(result) {
  const anchorNews = document.querySelector("#news-cards");
  anchorNews.innerHTML = "";

  for (const data of result) {
    const ref = data.imagem?.asset?._ref;

    const imgURL = ref
      ? `https://cdn.sanity.io/images/zjpvcus5/production/${ref
          .replace("image-", "")
          .replace(/-(\w+)$/, ".$1")}`
      : "fallback.jpg";

    const article = document.createElement("article");
    article.classList.add("service-card");
    article.innerHTML = `
      <img class="service-card__icon" src="${imgURL}" alt="${data.titulo}" />
      <div class="service-card__content">
        <h3 class="service-card__title">${data.titulo}</h3>
        <p class="service-card__description">${data.descricao}</p>
      </div>
    `;

    anchorNews.append(article);
  }
}

(async () => {
  const cachedNews = localStorage.getItem("newsData");
  let cachedData = null;

  try {
    if (cachedNews) {
      cachedData = JSON.parse(cachedNews);
      renderNews(cachedData);
    }
  } catch (error) {
    console.warn("Failed to parse cached contact:", error);
  }

  try {
    const response = await fetch(URLhome);
    const json = await response.json();
    const result = json.result;

    if (JSON.stringify(result) !== JSON.stringify(cachedData)) {
      renderNews(result);
      localStorage.setItem("newsData", JSON.stringify(result));
    }
  } catch (error) {
    console.error("Cache error = " + error);
  }
})();
