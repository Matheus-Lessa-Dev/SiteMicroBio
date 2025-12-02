const URLunilab =
  "https://zjpvcus5.api.sanity.io/v2025-11-08/data/query/production?query=*%5B_type+%3D%3D+%22unilab%22%5D%0A%7B+unilab%0A++%0A%7D&perspective=drafts";

(async () => {
  const response = await fetch(URLunilab);
  const json = await response.json();
  const result = json.result[0];

  document.getElementById("unilab-link").href = result.unilab;
  if(document.getElementById("unilab-link-acessar")){
    document.getElementById("unilab-link-acessar").href = result.unilab;
  }
})();
