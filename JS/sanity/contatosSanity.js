const URLcontatos =
  "https://zjpvcus5.api.sanity.io/v2025-11-10/data/query/production?query=+*%5B_type%3D%3D%22contatos%22%5D%7B%0A++++rua%2C%0A++++++cidade%2C%0A++++++cep%2C%0A++++++horario%2C%0A++++++horarioFds%2C%0A++++++telefone%2C%0A++++++email%0A++%7D&perspective=drafts";
async function renderContatos(result) {
  const anchorAddress = document.querySelector("#rua-cidade-cep");
  const anchorBusinessHours = document.querySelector("#funcionamento");
  const anchorContact = document.querySelector("#contato");

  [anchorAddress, anchorBusinessHours, anchorContact].forEach(
    (result) => (result.innerHTML = "")
  );

  const divRua = document.createElement("div");
  divRua.append(result.rua);

  const divCidade = document.createElement("div");
  divCidade.append(result.cidade);
  if (result.cep != null) {
    const divCep = document.createElement("div");
    divCep.append("CEP: ");
    divCep.append(result.cep);

    anchorAddress.append(divRua, divCidade, divCep);
  } else {
    anchorAddress.append(divRua, divCidade);
  }

  const divFuncionamento = document.createElement("div");
  divFuncionamento.append(result.horario);

  if (result.horarioFds != null) {
    const divFuncionamentoFds = document.createElement("div");
    divFuncionamentoFds.append(result.horarioFds);

    anchorBusinessHours.append(divFuncionamento, divFuncionamentoFds);
  } else {
    anchorBusinessHours.append(divFuncionamento);
  }
  const divTelefone = document.createElement("div");
  divTelefone.append(`Telefone: ${result.telefone}`);

  const divEmail = document.createElement("div");
  divEmail.append(`E-mail: ${result.email}`);

  anchorContact.append(divTelefone, divEmail);
}

(async () => {
  const cachedContact = localStorage.getItem("contatosData");
  let cachedData = null;

  try {
    if (cachedContact) {
      cachedData = JSON.parse(cachedContact);
      renderContatos(cachedData);
    }
  } catch (error) {
    console.warn("Failed to parse cached contact:", error);
  }

  try {
    const response = await fetch(URLcontatos);
    const json = await response.json();
    const result = json.result;

    if (JSON.stringify(result[0]) !== JSON.stringify(cachedData)) {
      renderContatos(result[0]);
      localStorage.setItem("contatosData", JSON.stringify(result[0]));
    }
  } catch (error) {
    console.error("Cache error = " + error);
  }
})();
