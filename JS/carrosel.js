const carousel = document.getElementById("news-cards");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

function slideNext() {
  const firstCard = carousel.querySelector(".service-card");
  if (!firstCard) return;

  const cardWidth = firstCard.offsetWidth + 10;
  carousel.style.transition = "transform 0.4s ease-in-out";
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    carousel.style.transition = "none";
    carousel.appendChild(firstCard);
    carousel.style.transform = "translateX(0)";
  }, 400);
}

function slidePrev() {
  const cards = carousel.querySelectorAll(".service-card");
  if (cards.length === 0) return;

  const lastCard = cards[cards.length - 1];
  const cardWidth = lastCard.offsetWidth + 10;

  carousel.style.transition = "none";
  carousel.insertBefore(lastCard, cards[0]);
  carousel.style.transform = `translateX(-${cardWidth}px)`;
  void carousel.offsetWidth;
  carousel.style.transition = "transform 0.4s ease-in-out";
  carousel.style.transform = "translateX(0)";
}

next.addEventListener("click", slideNext);
prev.addEventListener("click", slidePrev);
