// Burger menu toggle (mobile)
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

// Intake form logic
const intakeForm = document.getElementById("intakeForm");
const svcStorage = document.getElementById("svcStorage");
const storageNotice = document.getElementById("storageNotice");
const standardBoxes = document.getElementById("standardBoxes");
const formStatus = document.getElementById("formStatus");

function updateStorageUI(){
  if (!svcStorage || !storageNotice || !standardBoxes) return;
  const on = svcStorage.checked;

  storageNotice.classList.toggle("hidden", !on);

  // Standard box question is required only if storage selected
  if (on) standardBoxes.setAttribute("required", "required");
  else {
    standardBoxes.removeAttribute("required");
    standardBoxes.value = "";
  }
}

svcStorage?.addEventListener("change", updateStorageUI);
updateStorageUI();

intakeForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!intakeForm.checkValidity()){
    formStatus && (formStatus.textContent = "Please complete all required fields and confirmations.");
    intakeForm.reportValidity();
    return;
  }

  // Demo submit
  formStatus && (formStatus.textContent = "Request submitted (demo). To receive submissions by email, connect a backend later.");
  intakeForm.reset();
  updateStorageUI();
});