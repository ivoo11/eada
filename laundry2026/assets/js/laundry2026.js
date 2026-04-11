const TOTAL_IMAGES = 145;
const GALLERY_SLUG = "laundry2026";

const images = Array.from({ length: TOTAL_IMAGES }, (_, index) => {
  const n = String(index + 1).padStart(3, "0");
  return {
    thumb: `./assets/img/thumbs/${GALLERY_SLUG}-${n}.jpg`,
    large: `./assets/img/large/${GALLERY_SLUG}-${n}.jpg`,
    alt: `Laundry 2026 - Foto ${index + 1}`,
    caption: `Laundry 2026 · Foto ${index + 1}`
  };
});

const galleryGrid = document.getElementById("galleryGrid");
const galleryCount = document.getElementById("gallery-count");

const lightbox = document.getElementById("lightbox");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function renderGallery() {
  galleryGrid.innerHTML = "";

  images.forEach((image, index) => {
    const card = document.createElement("button");
    card.className = "gallery-card";
    card.type = "button";
    card.setAttribute("aria-label", `Abrir imagen ${index + 1}`);

    card.innerHTML = `
      <img src="${image.thumb}" alt="${image.alt}" loading="lazy" />
    `;

    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });

}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function updateLightbox() {
  const image = images[currentIndex];
  lightboxImage.src = image.large;
  lightboxImage.alt = image.alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxBackdrop) {
    closeLightbox();
  }
});
lightboxNext.addEventListener("click", showNext);
lightboxPrev.addEventListener("click", showPrev);

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) < 50) return;

  if (diff < 0) showNext();
  else showPrev();
}

renderGallery();