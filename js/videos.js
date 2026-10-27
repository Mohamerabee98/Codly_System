const videos = [
 
  {
    id: "scratch-01",
    title: "مقدمة في Scratch",
    description: "تعرف على واجهة سكراتش وكيفية إنشاء أول مشروع.",
    category: "scratch",
    src: "https://www.youtube.com/embed/f7LwHQ9H9c0",
    thumbnail: "assets/images/scratch-01.jpg",
    duration: "18 دقيقة",
    lessonNumber: 1,
    level: "مبتدئ",
    symbol: "S1"
  },

 
];

const categoryNames = {
  all: "كل الدروس",
  scratch: "Scratch",
  python: "Python",
  web: "Web Development"
};

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("video-grid");
  if (!grid) return;

  const searchInput = document.getElementById("video-search");
  const resultsTitle = document.getElementById("results-title");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const resetButton = document.getElementById("reset-search");
  const categoryButtons = [...document.querySelectorAll("[data-category]")];

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  let activeCategory = Object.hasOwn(categoryNames, requestedCategory) ? requestedCategory : "all";
  let searchTerm = "";

  function getCategoryLabel(category) {
    return categoryNames[category] || "كورس";
  }

  function setActiveCategory(category, updateUrl = true) {
    activeCategory = Object.hasOwn(categoryNames, category) ? category : "all";
    categoryButtons.forEach((button) => {
      const active = button.dataset.category === activeCategory;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeCategory === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", activeCategory);
      history.replaceState({}, "", url);
    }
    renderVideos();
  }

  function renderVideos() {
    const filtered = videos.filter((video) => {
      const categoryMatches = activeCategory === "all" || video.category === activeCategory;
      const text = `${video.title} ${video.description} ${getCategoryLabel(video.category)}`.toLocaleLowerCase("ar");
      return categoryMatches && text.includes(searchTerm.toLocaleLowerCase("ar"));
    });

    resultsTitle.textContent = categoryNames[activeCategory];
    resultsCount.textContent = `عدد الدروس: ${filtered.length}`;
    grid.innerHTML = "";
    emptyState.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;

    filtered.forEach((video) => {
      const card = document.createElement("article");
      card.className = "lesson-card";

      const thumb = document.createElement("div");
      thumb.className = `lesson-thumb thumb-${video.category}`;
      thumb.style.background = video.category === "scratch"
        ? "linear-gradient(135deg,#d8862c,#f6c86a)"
        : video.category === "python"
          ? "linear-gradient(135deg,#3476ba,#63b9e5)"
          : "linear-gradient(135deg,#5940bc,#9d83f2)";

      const image = document.createElement("img");
      image.src = video.thumbnail;
      image.alt = `صورة ${video.title}`;
      image.loading = "lazy";
      image.addEventListener("error", () => image.remove());
      thumb.append(image);

      const symbol = document.createElement("span");
      symbol.className = "lesson-thumb-symbol";
      symbol.textContent = video.symbol || "</>";
      thumb.append(symbol);

      const number = document.createElement("span");
      number.className = "lesson-number";
      number.textContent = `الدرس ${video.lessonNumber || 1}`;
      thumb.append(number);

      const duration = document.createElement("span");
      duration.className = "lesson-duration";
      duration.textContent = video.duration || "مدة غير محددة";
      thumb.append(duration);

      const play = document.createElement("span");
      play.className = "play-overlay";
      play.textContent = "▶";
      play.setAttribute("aria-hidden", "true");
      thumb.append(play);

      const body = document.createElement("div");
      body.className = "lesson-card-body";

      const meta = document.createElement("div");
      meta.className = "lesson-card-meta";
      const level = document.createElement("span");
      level.className = "course-level";
      level.textContent = video.level || "درس تعليمي";
      const cat = document.createElement("span");
      cat.className = "duration-tag";
      cat.textContent = getCategoryLabel(video.category);
      meta.append(level, cat);

      const title = document.createElement("h3");
      title.textContent = video.title;
      const description = document.createElement("p");
      description.textContent = video.description;

      const link = document.createElement("a");
      link.className = "lesson-watch";
      link.href = `video-player.html?id=${encodeURIComponent(video.id)}`;
      const watchText = document.createElement("span");
      watchText.textContent = "شاهد الدرس";
      const arrow = document.createElement("span");
      arrow.textContent = "←";
      link.append(watchText, arrow);

      body.append(meta, title, description, link);
      card.append(thumb, body);
      grid.append(card);
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveCategory(button.dataset.category));
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    renderVideos();
  });

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    setActiveCategory("all");
  });

  setActiveCategory(activeCategory, false);
});
