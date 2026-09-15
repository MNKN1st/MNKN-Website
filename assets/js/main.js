"use strict";
// Add paths relative to each HTML page when the final files are ready.
const media = { story: "", showreel: "" };
const contactEmail = "manakinproductions@gmail.com";
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.hidden = false;
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
  nav.classList.toggle("is-open", open);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    toggle.click(); toggle.focus();
  }
});
document.querySelectorAll("[data-video]").forEach(slot => {
  const path = media[slot.dataset.video];
  if (!path) return;
  const player = document.createElement("video");
  player.controls = true; player.preload = "metadata"; player.playsInline = true;
  player.setAttribute("aria-label", slot.dataset.video === "story" ? "The MNKN story" : "MNKN showreel");
  player.src = path;
  player.addEventListener("error", () => {
    const message = document.createElement("p");
    message.textContent = "This video is currently unavailable. Please try again later.";
    slot.replaceChildren(message);
  });
  slot.replaceChildren(player);
  if (slot.dataset.video === "showreel") document.querySelector(".reel-note")?.remove();
});
if (contactEmail) document.querySelectorAll("[data-contact]").forEach(slot => {
  const link = document.createElement("a"); link.href = "mailto:" + contactEmail;
  link.className = "email-link"; link.textContent = contactEmail; slot.replaceChildren(link);
});
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

const brandBand = document.querySelector(".brand-band");
if (brandBand) {
  const track = brandBand.querySelector(".brand-track");
  const copy = track.querySelector(".brand-group").cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  copy.querySelectorAll("img").forEach(img => { img.alt = ""; });
  track.append(copy);
  const button = brandBand.querySelector("[data-band-pause]");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let visible = true;
  function sync() {
    brandBand.classList.toggle("is-animated", !motion.matches);
    brandBand.classList.toggle("is-paused", paused || !visible || document.hidden);
    button.hidden = motion.matches;
    button.textContent = paused ? "Play" : "Pause";
    button.setAttribute("aria-label", paused ? "Play logo band" : "Pause logo band");
  }
  button.addEventListener("click", () => { paused = !paused; sync(); });
  motion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(brandBand);
  sync();
}

const projectPlayer = document.querySelector("#project-player");
if (projectPlayer) {
  const dialog = document.querySelector(".project-dialog");
  const error = document.querySelector("#project-error");
  projectPlayer.addEventListener("error", () => { error.hidden = false; });
  document.querySelectorAll(".video-card").forEach(card => card.addEventListener("click", () => {
    error.hidden = true;
    projectPlayer.poster = card.dataset.poster;
    projectPlayer.src = card.dataset.src;
    projectPlayer.setAttribute("aria-label", card.dataset.title);
    document.querySelector("#project-title").textContent = card.dataset.title;
    dialog.showModal();
    document.body.classList.add("video-open");
    projectPlayer.play().catch(() => { /* Native play control remains available. */ });
  }));
  dialog.querySelector(".close-video").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => {
    projectPlayer.pause();
    projectPlayer.removeAttribute("src");
    projectPlayer.load();
    document.body.classList.remove("video-open");
  });
}

const storyBackground = document.querySelector("#story-background");
if (storyBackground) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector("#story-motion-toggle");
  let userPaused = false;
  let failed = false;
  let inView = true;
  storyBackground.muted = true;
  function updateButton() {
    toggle.hidden = motion.matches || failed;
    toggle.textContent = userPaused ? "Play background" : "Pause background";
  }
  function fallback() {
    failed = true;
    storyBackground.pause();
    storyBackground.classList.remove("is-playing");
    updateButton();
  }
  async function syncBackground() {
    updateButton();
    if (motion.matches || failed) {
      storyBackground.pause();
      storyBackground.classList.remove("is-playing");
      return;
    }
    if (userPaused || document.hidden || !inView) { storyBackground.pause(); return; }
    if (!storyBackground.getAttribute("src")) storyBackground.src = storyBackground.dataset.src;
    try { await storyBackground.play(); } catch (error) {
      if (error.name !== "AbortError") fallback();
    }
  }
  storyBackground.addEventListener("playing", () => {
    if (!motion.matches && !failed) storyBackground.classList.add("is-playing");
  });
  storyBackground.addEventListener("error", fallback);
  toggle.addEventListener("click", () => { userPaused = !userPaused; syncBackground(); });
  motion.addEventListener("change", syncBackground);
  document.addEventListener("visibilitychange", syncBackground);
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncBackground(); }).observe(document.querySelector(".story-page"));
  syncBackground();
}
