const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

if (burgerBtn && mobileMenu && menuOverlay) {
  function setOpen(open) {
    burgerBtn.classList.toggle("is-open", open);
    burgerBtn.setAttribute("aria-expanded", open ? "true" : "false");

    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");

    menuOverlay.classList.toggle("is-open", open);
    menuOverlay.setAttribute("aria-hidden", open ? "false" : "true");

    document.body.style.overflow = open ? "hidden" : "";
  }

  function closeWithBounce() {
    mobileMenu.classList.add("is-closing");
    setTimeout(() => {
      mobileMenu.classList.remove("is-closing");
      setOpen(false);
    }, 120);
  }

  function isOpen() {
    return burgerBtn.getAttribute("aria-expanded") === "true";
  }

  burgerBtn.addEventListener("click", () => {
    isOpen() ? closeWithBounce() : setOpen(true);
  });

  menuOverlay.addEventListener("click", closeWithBounce);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWithBounce();
  });

  // Close when clicking any mobile link
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeWithBounce);
  });

  // Ensure closed on load
  setOpen(false);
}
