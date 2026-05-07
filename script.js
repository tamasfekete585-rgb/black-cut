const products = [
  {
    id: "csempe-portré",
    title: "Gravírozott emlékcsempe",
    category: "csempe",
    categoryLabel: "Csempék",
    price: "8 900 Ft-tól",
    description:
      "Fényképes vagy szöveges kerámia csempe családi emlékhez, évfordulóhoz vagy névtáblához.",
    mark: "CSEMPE",
    bg: "linear-gradient(135deg, #d7dcc2, #8ea06d)",
    surface: "linear-gradient(135deg, #fffaf0, #d8d0b8)",
    shape: "0.35rem",
  },
  {
    id: "fakep-csaladi",
    title: "Gravírozott fakép",
    category: "fakep",
    categoryLabel: "Faképek",
    price: "12 900 Ft-tól",
    description:
      "Meleg tónusú fa alapra gravírozott portré, kisállat, idézet vagy családi jelenet.",
    mark: "FAKÉP",
    bg: "linear-gradient(135deg, #c7a06c, #6d442d)",
    surface: "repeating-radial-gradient(circle, #c9965d 0 0.28rem, #a86d3f 0.31rem 0.62rem)",
    shape: "0.4rem",
  },
  {
    id: "lampa-hangulat",
    title: "Fénygravíros lámpa",
    category: "lampa",
    categoryLabel: "Lámpák",
    price: "14 500 Ft-tól",
    description:
      "Hangulatlámpa gravírozott akril vagy fa betéttel, névvel, dátummal vagy rajzzal.",
    mark: "LÁMPA",
    bg: "radial-gradient(circle at 50% 40%, #ffe9a8, #7f5b39 45%, #1e2a24)",
    surface: "linear-gradient(180deg, rgba(255, 244, 194, 0.9), rgba(219, 175, 92, 0.55))",
    shape: "50% 50% 0.7rem 0.7rem",
  },
  {
    id: "kulcstarto-neves",
    title: "Névre szóló kulcstartó",
    category: "ajandek",
    categoryLabel: "Kisebb ajándékok",
    price: "2 400 Ft-tól",
    description:
      "Kis méretű, gyorsan elkészíthető gravírozott ajándék fa, akril vagy fém hatású alapon.",
    mark: "NÉV",
    bg: "linear-gradient(135deg, #7f8f58, #263f2f)",
    surface: "linear-gradient(135deg, #dcb980, #8f5733)",
    shape: "50%",
  },
  {
    id: "falidisz-mandala",
    title: "Gravírozott fali dísz",
    category: "falidiszek",
    categoryLabel: "Fali díszek",
    price: "9 900 Ft-tól",
    description:
      "Dekoratív falikép, mandala, családi felirat vagy otthoni idézet kisebb-nagyobb méretben.",
    mark: "OTTHON",
    bg: "linear-gradient(135deg, #efe1c0, #526b3f)",
    surface: "radial-gradient(circle, #d7b77a, #825536)",
    shape: "50%",
  },
  {
    id: "csempe-konyha",
    title: "Konyhai dekorcsempe",
    category: "csempe",
    categoryLabel: "Csempék",
    price: "7 900 Ft-tól",
    description:
      "Konyhába, teraszra vagy ajtó mellé kérhető mintás, feliratos gravírozott csempe.",
    mark: "KONYHA",
    bg: "linear-gradient(135deg, #f3ead8, #b75435)",
    surface: "linear-gradient(135deg, #fffaf0, #c9a35d)",
    shape: "0.35rem",
  },
  {
    id: "fakep-idézet",
    title: "Idézetes fakép",
    category: "fakep",
    categoryLabel: "Faképek",
    price: "10 900 Ft-tól",
    description:
      "Letisztult falikép kedvenc idézettel, névvel, dátummal vagy rövid üzenettel.",
    mark: "IDÉZET",
    bg: "linear-gradient(135deg, #9a613b, #263f2f)",
    surface: "linear-gradient(135deg, #c68d59, #7b4c31)",
    shape: "0.4rem",
  },
  {
    id: "lampa-neves",
    title: "Névre szóló éjjeli fény",
    category: "lampa",
    categoryLabel: "Lámpák",
    price: "11 900 Ft-tól",
    description:
      "Gyerekszobába vagy hálóba készített puha fényű gravírozott lámpa.",
    mark: "FÉNY",
    bg: "radial-gradient(circle at 50% 42%, #fff2bd, #526b3f 48%, #10251b)",
    surface: "linear-gradient(180deg, rgba(255, 247, 215, 0.86), rgba(195, 139, 72, 0.54))",
    shape: "1.4rem 1.4rem 0.5rem 0.5rem",
  },
];

const rail = document.querySelector(".product-rail");
const categoryButtons = document.querySelectorAll(".category-button");
const modal = document.querySelector(".product-modal");
const modalVisual = document.querySelector("#modal-visual");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");
const closeButton = document.querySelector(".close-button");
const uploadInput = document.querySelector("#upload-input");
const uploadName = document.querySelector("#upload-name");
const noteInput = document.querySelector("#note-input");
const toast = document.querySelector(".toast");

let activeCategory = "mind";
let toastTimer;
let doorProgress = 0;
let touchStartY = 0;

function applyProductArt(element, product) {
  element.style.setProperty("--art-bg", product.bg);
  element.style.setProperty("--surface", product.surface);
  element.style.setProperty("--shape", product.shape);
  element.dataset.mark = product.mark;
}

function renderProducts() {
  const visibleProducts =
    activeCategory === "mind"
      ? products
      : products.filter((product) => product.category === activeCategory);

  rail.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art" data-id="${product.id}" data-mark="${product.mark}"></div>
          <div class="product-body">
            <p class="eyebrow">${product.categoryLabel}</p>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              <span class="price">${product.price}</span>
              <button class="open-product" type="button" data-product="${product.id}">Megnyitás</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  rail.querySelectorAll(".product-art").forEach((art) => {
    const product = products.find((item) => item.id === art.dataset.id);
    applyProductArt(art, product);
  });
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  modalCategory.textContent = product.categoryLabel;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price;
  applyProductArt(modalVisual, product);
  uploadInput.value = "";
  uploadName.textContent = "Még nincs kiválasztott kép.";
  noteInput.value = "";
  modal.showModal();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function setDoorProgress(value) {
  doorProgress = Math.max(0, Math.min(1, value));
  const reveal = Math.max(0, (doorProgress - 0.22) / 0.78);
  const heroOpacity = Math.max(0, 1 - doorProgress / 0.42);
  document.documentElement.style.setProperty("--door-open", doorProgress.toFixed(3));
  document.documentElement.style.setProperty("--catalog-reveal", reveal.toFixed(3));
  document.documentElement.style.setProperty("--hero-copy-opacity", heroOpacity.toFixed(3));
}

function shouldHoldPageScroll(deltaY, target) {
  if (modal.open) return false;
  if (target.closest(".product-rail") && doorProgress >= 1) return false;
  if (window.scrollY > 3) return deltaY < 0 && window.scrollY < 18 && doorProgress > 0;
  if (deltaY > 0) return doorProgress < 1;
  return doorProgress > 0;
}

function handleDoorWheel(event) {
  if (!shouldHoldPageScroll(event.deltaY, event.target)) return;
  event.preventDefault();
  setDoorProgress(doorProgress + event.deltaY / 760);
}

function handleTouchStart(event) {
  touchStartY = event.touches[0]?.clientY || 0;
}

function handleTouchMove(event) {
  const currentY = event.touches[0]?.clientY || touchStartY;
  const deltaY = touchStartY - currentY;
  if (!shouldHoldPageScroll(deltaY, event.target)) return;
  event.preventDefault();
  setDoorProgress(doorProgress + deltaY / 360);
  touchStartY = currentY;
}

function syncDoorWithPagePosition() {
  if (window.scrollY > window.innerHeight * 0.18) setDoorProgress(1);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
    rail.scrollTo({ left: 0, behavior: "smooth" });
  });
});

rail.addEventListener(
  "wheel",
  (event) => {
    if (doorProgress < 1) return;
    if (!rail.matches(":hover")) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    rail.scrollLeft += event.deltaY;
  },
  { passive: false }
);

rail.addEventListener("click", (event) => {
  const button = event.target.closest(".open-product");
  if (button) openProduct(button.dataset.product);
});

document.querySelector(".rail-prev").addEventListener("click", () => {
  rail.scrollBy({ left: -420, behavior: "smooth" });
});

document.querySelector(".rail-next").addEventListener("click", () => {
  rail.scrollBy({ left: 420, behavior: "smooth" });
});

closeButton.addEventListener("click", () => modal.close());

uploadInput.addEventListener("change", () => {
  uploadName.textContent = uploadInput.files?.[0]?.name || "Még nincs kiválasztott kép.";
});

modal.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  modal.close();
  showToast("A rendelési igény mintaként rögzítve. Élesítéskor innen mehet e-mailbe vagy kosárba.");
});

window.addEventListener("wheel", handleDoorWheel, { passive: false });
window.addEventListener("touchstart", handleTouchStart, { passive: true });
window.addEventListener("touchmove", handleTouchMove, { passive: false });
window.addEventListener("scroll", syncDoorWithPagePosition, { passive: true });
window.addEventListener("resize", () => setDoorProgress(doorProgress));

renderProducts();
setDoorProgress(window.scrollY > 10 ? 1 : 0);
setTimeout(() => setDoorProgress(window.scrollY > 10 ? 1 : doorProgress), 80);
