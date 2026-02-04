// Burger menu toggle
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu(){
  if (!burgerBtn || !mobileMenu) return;
  burgerBtn.setAttribute("aria-expanded", "false");
  mobileMenu.classList.add("hidden");
  mobileMenu.setAttribute("aria-hidden", "true");
}

function openMenu(){
  if (!burgerBtn || !mobileMenu) return;
  burgerBtn.setAttribute("aria-expanded", "true");
  mobileMenu.classList.remove("hidden");
  mobileMenu.setAttribute("aria-hidden", "false");
}

burgerBtn?.addEventListener("click", () => {
  const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
  if (isOpen) closeMenu();
  else openMenu();
});

document.querySelectorAll(".mobile-link").forEach((a) => {
  a.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

