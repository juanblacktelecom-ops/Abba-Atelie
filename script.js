const WHATSAPP_NUMBER = "5500000000000";

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 90) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    const texto = `Olá, Abba Ateliê! Meu nome é ${nome}. Tenho interesse em: ${servico}. Mensagem: ${mensagem}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, "_blank");
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryCards.forEach((card) => {
      const categories = card.dataset.category || "";

      if (filter === "todos" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const modal = document.getElementById("modelModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const closeModal = document.getElementById("closeModal");

function openModal(model, category, image) {
  if (!modal) return;

  modalImage.src = image;
  modalImage.alt = model;
  modalTitle.textContent = model;
  modalCategory.textContent = category || "Modelo Abba Ateliê";

  const message = `Olá! Gostei do ${model} (${category}). Gostaria de solicitar um orçamento.`;
  modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModelModal() {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const model = button.dataset.model || "Modelo Abba Ateliê";
    const category = button.dataset.category || "Modelo Abba Ateliê";
    const image = button.dataset.image || button.closest(".gallery-card")?.querySelector("img")?.src;

    openModal(model, category, image);
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeModelModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModelModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModelModal();
  }
});


/* Sistema de favoritos do mostruário */
const favoritesPanel = document.getElementById("favoritesPanel");
const favoritesToggle = document.getElementById("favoritesToggle");
const favoritesCount = document.getElementById("favoritesCount");
const favoritesList = document.getElementById("favoritesList");
const favoritesWhatsapp = document.getElementById("favoritesWhatsapp");
const clearFavorites = document.getElementById("clearFavorites");
const favoriteButtons = document.querySelectorAll(".favorite-btn");

const FAVORITES_KEY = "abba_atelie_favoritos";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(model) {
  return getFavorites().some((item) => item.model === model);
}

function toggleFavorite(item) {
  let favorites = getFavorites();

  if (favorites.some((fav) => fav.model === item.model)) {
    favorites = favorites.filter((fav) => fav.model !== item.model);
  } else {
    favorites.push(item);
  }

  saveFavorites(favorites);
  renderFavorites();
}

function renderFavorites() {
  if (!favoritesCount || !favoritesList || !favoritesWhatsapp) return;

  const favorites = getFavorites();

  favoritesCount.textContent = favorites.length;
  favoritesList.innerHTML = "";

  favoriteButtons.forEach((button) => {
    button.classList.toggle("active", isFavorite(button.dataset.model));
  });

  if (favorites.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Nenhum modelo escolhido.";
    favoritesList.appendChild(empty);
    favoritesWhatsapp.classList.add("disabled");
    favoritesWhatsapp.href = "#";
    return;
  }

  favorites.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.model}</span>
      <button class="remove-favorite" type="button" aria-label="Remover ${item.model}">×</button>
    `;

    li.querySelector(".remove-favorite").addEventListener("click", () => {
      const updated = getFavorites().filter((fav) => fav.model !== item.model);
      saveFavorites(updated);
      renderFavorites();
    });

    favoritesList.appendChild(li);
  });

  const modelos = favorites.map((item) => `${item.model} - ${item.category}`).join(", ");
  const message = `Olá, Abba Ateliê! Gostei dos seguintes modelos do mostruário: ${modelos}. Gostaria de solicitar um orçamento.`;

  favoritesWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  favoritesWhatsapp.classList.remove("disabled");
}

if (favoritesToggle && favoritesPanel) {
  favoritesToggle.addEventListener("click", () => {
    favoritesPanel.classList.toggle("active");
  });
}

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleFavorite({
      model: button.dataset.model,
      category: button.dataset.category,
      image: button.dataset.image
    });
  });
});

if (clearFavorites) {
  clearFavorites.addEventListener("click", () => {
    localStorage.removeItem(FAVORITES_KEY);
    renderFavorites();
  });
}

renderFavorites();
