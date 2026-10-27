const playerVideos = [
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
    symbol: "S1",
  },
  // {
  //   id: "python-01",
  //   title: "مقدمة في Python",
  //   description: "تعرف على لغة بايثون وفكرة كتابة أول برنامج.",
  //   category: "python",
  //   categoryLabel: "Python",
  //   src: "videos/python/lesson-01.mp4",
  //   duration: "30 دقيقة",
  //   lessonNumber: 1,
  //   symbol: "Py"
  // },
  // {
  //   id: "web-01",
  //   title: "مقدمة في HTML",
  //   description: "تعرف على أساسيات بناء صفحات الويب باستخدام HTML.",
  //   category: "web",
  //   categoryLabel: "Web Development",
  //   src: "videos/web/lesson-01.mp4",
  //   duration: "30 دقيقة",
  //   lessonNumber: 1,
  //   symbol: "</>"
  // }
];

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id");
  const current = playerVideos.find((video) => video.id === videoId);

  const errorPanel = document.getElementById("player-error");
  const playerLayout = document.getElementById("player-layout");
  const videoElement = document.getElementById("lesson-video");
  const loading = document.getElementById("video-loading");
  const fallback = document.getElementById("video-fallback");

  if (!current) {
    playerLayout.hidden = true;
    errorPanel.hidden = false;
    return;
  }

  document.title = `${current.title} | Codly Academy`;
  document.getElementById("breadcrumb-title").textContent = current.title;
  document.getElementById("back-category").href =
    `videos.html?category=${encodeURIComponent(current.category)}`;
  document.getElementById("player-category").textContent =
    current.categoryLabel;
  document.getElementById("player-duration").textContent =
    current.duration || "مدة غير محددة";
  document.getElementById("player-title").textContent = current.title;
  document.getElementById("player-description").textContent =
    current.description;

  const relatedVideos = playerVideos.filter(
    (video) => video.category === current.category,
  );
  const playlist = document.getElementById("playlist");
  document.getElementById("playlist-count").textContent = String(
    relatedVideos.length,
  );

  relatedVideos.forEach((video) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `playlist-item${video.id === current.id ? " active" : ""}`;
    item.setAttribute(
      "aria-current",
      video.id === current.id ? "true" : "false",
    );

    const thumb = document.createElement("span");
    thumb.className = "playlist-thumb";
    thumb.textContent = video.symbol;

    const text = document.createElement("span");
    text.className = "playlist-text";
    const title = document.createElement("b");
    title.textContent = video.title;
    const duration = document.createElement("small");
    duration.textContent = `الدرس ${video.lessonNumber} · ${video.duration}`;
    text.append(title, duration);
    item.append(thumb, text);

    item.addEventListener("click", () => {
      window.location.href = `video-player.html?id=${encodeURIComponent(video.id)}`;
    });
    playlist.append(item);
  });

  const categoryLessons = playerVideos.filter(
    (video) => video.category === current.category,
  );
  const currentIndex = categoryLessons.findIndex(
    (video) => video.id === current.id,
  );
  const previousButton = document.getElementById("previous-lesson");
  const nextButton = document.getElementById("next-lesson");

  previousButton.disabled = currentIndex <= 0;
  nextButton.disabled =
    currentIndex === -1 || currentIndex >= categoryLessons.length - 1;

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0)
      window.location.href = `video-player.html?id=${encodeURIComponent(categoryLessons[currentIndex - 1].id)}`;
  });
  nextButton.addEventListener("click", () => {
    if (currentIndex < categoryLessons.length - 1)
      window.location.href = `video-player.html?id=${encodeURIComponent(categoryLessons[currentIndex + 1].id)}`;
  });

  videoElement.src = current.src;
  videoElement.addEventListener("loadedmetadata", () => {
    loading.hidden = true;
    fallback.hidden = true;
  });
  videoElement.addEventListener("canplay", () => {
    loading.hidden = true;
    fallback.hidden = true;
  });
  videoElement.addEventListener("error", () => {
    loading.hidden = true;
    fallback.hidden = false;
  });

  // Hide the spinner if the video is not immediately available locally.
  window.setTimeout(() => {
    if (videoElement.readyState < 1 && !fallback.hidden) loading.hidden = true;
  }, 4500);

  videoElement.load();
});
