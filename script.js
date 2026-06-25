const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

document.querySelectorAll(".video-card[data-video-src]").forEach((card) => {
  const loader = card.querySelector(".video-loader");

  loader?.addEventListener("click", () => {
    const video = document.createElement("video");
    const source = document.createElement("source");

    video.controls = true;
    video.autoplay = true;
    video.preload = "metadata";
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-label", card.dataset.videoTitle || "Selected video");
    source.src = card.dataset.videoSrc || "";
    source.type = "video/mp4";
    video.append(source);
    loader.replaceWith(video);
    video.play().catch(() => {});

    document.querySelectorAll("video").forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});
