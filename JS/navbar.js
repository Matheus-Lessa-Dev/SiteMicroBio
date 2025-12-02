const elementoAlvo = document.querySelector("#header");

const pontoDeAtivacao = 0.2;

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > pontoDeAtivacao) {
    elementoAlvo.classList.remove("page-header");
    elementoAlvo.classList.add("page-header--scrolled");
  } else {
    elementoAlvo.classList.remove("page-header--scrolled");
    elementoAlvo.classList.add("page-header");
  }
});

//É so pro forms nao dar refresh na page e limpar os campos
//ta aq pq todas as pag vai ter esse js e eu nao quero fazer um arquivo pra 3 linhas.
//Dificil alguem mudar, mas esse primeiro pega o form
if (document.querySelector("#contato-verificacao")) {
  const form = document.querySelector("form");

  form.addEventListener("submit", (prop) => {
    //function basica pra nao dar refresh e reseta os campos, respectivamente
    prop.preventDefault();
    form.reset();
  });
}

// MENU MOBILE 

const hamburger = document.querySelector("#hamburger");
const mobileMenu = document.querySelector("#mobile-menu");

// Criar overlay
let overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
});

// Fechar ao clicar no overlay
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});

