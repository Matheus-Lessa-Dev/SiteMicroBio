const URLfooter =
  "https://zjpvcus5.api.sanity.io/v2025-11-09/data/query/production?query=%7B%0A++%22contato%22%3A+*%5B_type+%3D%3D+%22contatos%22%5D%5B0%5D%7B%0A++++email%2C%0A++++telefone%2C%0A++++rua%2C%0A++++cidade%0A++%7D%2C%0A++%22social%22%3A+*%5B_type+%3D%3D+%22sociais%22%5D%5B0%5D%7B%0A++++instagram%2C%0A++++facebook%2C%0A++++whats%0A++%7D%0A%7D%0A&perspective=drafts";

async function renderFooter(data) {
  document.getElementById("insta-footer").href = data.social.instagram;
  document.getElementById(
    "whats-footer"
  ).href = `https://api.whatsapp.com/send/?phone=${data.social.whats}&text=Estou+entrando+em+contato+atrav%C3%A9s+do+site&type=phone_number&app_absent=0`;
  document.getElementById("facebook-footer").href = data.social.facebook;

  document.getElementById(
    "email-footer"
  ).innerHTML = `<img src="../image/email.png" alt="icon" class="icon" />
   <p>${data.contato.email}</p>
  `;
  document.getElementById(
    "telefone-footer"
  ).innerHTML = `<img src="../image/phone.png" alt="icon" class="icon" />
   <p>${data.contato.telefone}</p>
  `;

  const anchorContatos = document.querySelector("#contatos-footer");

  const pRua = document.createElement("p");
  const pCidade = document.createElement("p");

  anchorContatos.innerHTML = "";
  pRua.append(data.contato.rua);
  pCidade.append(data.contato.cidade);

  anchorContatos.append(pRua, pCidade);
}

(async () => {
  const cachedFooter = localStorage.getItem("footerData");
  let cachedData = null;

  try {
    if (cachedFooter) {
      cachedData = JSON.parse(cachedFooter);
      renderFooter(cachedData);
    }
  } catch (error) {
    console.warn("Failed to parse cached footer:", error);
  }

  try {
    const response = await fetch(URLfooter);
    const json = await response.json();
    const result = json.result;

    if (JSON.stringify(result) !== JSON.stringify(cachedData)) {
      renderFooter(result);
      localStorage.setItem("footerData", JSON.stringify(result));
    }
  } catch (error) {
    console.error("Cache error:", error);
  }
})();
