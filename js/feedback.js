
// أضف صور الطلاب هنا
const feedbackImages = [
  {
    src: "assets/images/feedback/feedback1.jpeg",
    alt: "صورة رأي أحد طلاب Codly Academy",
    title: "آراء طلابنا",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback2.jpg",
    alt: "رسالة شكر من أحد الطلاب",
    title: "تجربة مميزة",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback3.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback4.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback5.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback6.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback7.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback8.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback9.jpg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback10.jpeg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback11.jpeg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback12.jpeg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
  {
    src: "assets/images/feedback/feedback13.jpeg",
    alt: "صورة تقييم أحد الطلاب",
    title: "خطوة جديدة في التعلم",
    description: "Feedback من أحد الطلاب"
  },
];




const gallery = document.getElementById("feedback-gallery");
const dotsContainer = document.getElementById("feedback-dots");
const counter = document.getElementById("feedback-counter");
const prevSlideButton = document.getElementById("feedback-prev-slide");
const nextSlideButton = document.getElementById("feedback-next-slide");

const lightbox = document.getElementById("feedback-lightbox");
const largeImage = document.getElementById("feedback-large-image");
const imageCaption = document.getElementById("feedback-image-caption");
const closeButton = document.getElementById("feedback-close");
const prevImageButton = document.getElementById("feedback-prev");
const nextImageButton = document.getElementById("feedback-next");

let currentSlide = 0;
let currentImage = 0;
let previousFocus = null;

function getVisibleSlides() {
  if (window.matchMedia("(max-width: 560px)").matches) return 1;
  if (window.matchMedia("(max-width: 900px)").matches) return 2;
  return 3;
}

function getMaxSlide() {
  return Math.max(0, feedbackImages.length - getVisibleSlides());
}

function renderFeedback() {
  if (!gallery) return;

  gallery.replaceChildren();
  dotsContainer?.replaceChildren();

  feedbackImages.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "feedback-card";

    const imageButton = document.createElement("button");
    imageButton.type = "button";
    imageButton.className = "feedback-image-button";
    imageButton.setAttribute("aria-label", `عرض الصورة ${index + 1}`);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt || item.title || "رأي أحد الطلاب";
    image.loading = "lazy";

    image.addEventListener("error", () => {
      card.remove();
      updateSlider();
    });

    imageButton.appendChild(image);
    imageButton.addEventListener("click", () => openLightbox(index));

    const footer = document.createElement("div");
    footer.className = "feedback-card-footer";

    const icon = document.createElement("div");
    icon.className = "feedback-card-icon";
    icon.textContent = "💙";
    icon.setAttribute("aria-hidden", "true");

    const textWrapper = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title || "آراء طلابنا";

    const description = document.createElement("p");
    description.textContent = item.description || "Feedback من أحد الطلاب";

    textWrapper.append(title, description);
    footer.append(icon, textWrapper);
    card.append(imageButton, footer);
    gallery.appendChild(card);
  });

  updateSlider();
}

function updateSlider() {
  if (!gallery) return;

  const cards = gallery.querySelectorAll(".feedback-card");
  const visible = getVisibleSlides();
  const maxSlide = Math.max(0, cards.length - visible);

  currentSlide = Math.min(currentSlide, maxSlide);

  const card = cards[0];
  if (card) {
    const styles = window.getComputedStyle(gallery);
    const gap = parseFloat(styles.columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;

    gallery.style.transform = `translateX(${currentSlide * distance}px)`;
  } else {
    gallery.style.transform = "translateX(0)";
  }

  if (prevSlideButton) {
    prevSlideButton.disabled = currentSlide === 0;
  }

  if (nextSlideButton) {
    nextSlideButton.disabled = currentSlide >= maxSlide;
  }

  if (dotsContainer) {
    dotsContainer.replaceChildren();

    const pageCount = maxSlide + 1;

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "feedback-dot" + (i === currentSlide ? " active" : "");
      dot.setAttribute("aria-label", `عرض المجموعة ${i + 1}`);
      dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");

      dot.addEventListener("click", () => {
        currentSlide = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }
  }

  if (counter) {
    counter.textContent = cards.length
      ? `${Math.min(currentSlide + visible, cards.length)} / ${cards.length}`
      : "0 / 0";
  }
}

function nextSlide() {
  if (currentSlide < getMaxSlide()) {
    currentSlide++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

prevSlideButton?.addEventListener("click", prevSlide);
nextSlideButton?.addEventListener("click", nextSlide);

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateSlider, 100);
});

// عرض الصور بالحجم الكامل
function openLightbox(index) {
  if (!lightbox || !feedbackImages[index]) return;

  currentImage = index;
  previousFocus = document.activeElement;

  updateLightbox();
  lightbox.hidden = false;
  document.body.classList.add("feedback-modal-open");
  closeButton?.focus();
}

function updateLightbox() {
  const item = feedbackImages[currentImage];
  if (!item || !largeImage) return;

  largeImage.src = item.src;
  largeImage.alt = item.alt || item.title || "رأي أحد الطلاب";

  if (imageCaption) {
    imageCaption.textContent = item.title || "آراء طلابنا";
  }

  const multiple = feedbackImages.length > 1;

  if (prevImageButton) prevImageButton.hidden = !multiple;
  if (nextImageButton) nextImageButton.hidden = !multiple;
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.classList.remove("feedback-modal-open");
  largeImage?.removeAttribute("src");
  previousFocus?.focus?.();
}

function nextImage() {
  currentImage = (currentImage + 1) % feedbackImages.length;
  updateLightbox();
}

function prevImage() {
  currentImage =
    (currentImage - 1 + feedbackImages.length) % feedbackImages.length;
  updateLightbox();
}

closeButton?.addEventListener("click", closeLightbox);
prevImageButton?.addEventListener("click", prevImage);
nextImageButton?.addEventListener("click", nextImage);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox && !lightbox.hidden) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") nextImage();
    if (event.key === "ArrowRight") prevImage();
    return;
  }

  if (event.key === "ArrowLeft") nextSlide();
  if (event.key === "ArrowRight") prevSlide();
});

renderFeedback();
