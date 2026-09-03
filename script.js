document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll(".media-toggle").forEach((toggle) => {
    const bundle = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      bundle.hidden = isExpanded;
    });
  });

  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  if (lightbox && lightboxImage) {
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImage.src = "";
    };

    document.querySelectorAll(".image-thumb").forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        const image = thumbnail.querySelector("img");
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.hidden = false;
      });
    });
    document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    if (link.hostname !== window.location.hostname || link.target === "_blank") return;
    link.addEventListener("click", (event) => {
      const destination = new URL(link.href, window.location.href);
      if (destination.pathname === window.location.pathname) return;
      event.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(() => { window.location.href = link.href; }, 220);
    });
  });
});