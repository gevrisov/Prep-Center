// --- Active section highlighting (only for links with data-section, on index page) ---
const navLinks = Array.from(document.querySelectorAll("[data-section]"));
const observedSections = Array.from(document.querySelectorAll("[data-observe]"));

function setActive(sectionId){
  navLinks.forEach(a => {
    const match = a.getAttribute("data-section") === sectionId;
    a.classList.toggle("glue-header__item--active", false); // safety
    a.classList.toggle("active", match); // not used, but ok
    a.parentElement?.classList.toggle("glue-header__item--active", match);
  });
}

if (observedSections.length && navLinks.length){
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible){
      setActive(visible.target.getAttribute("data-observe"));
    }
  }, { root: null, threshold: [0.2, 0.35, 0.5, 0.65] });

  observedSections.forEach(sec => io.observe(sec));
}

// --- Intake form behavior (works on intake.html) ---
const svcStorage = document.getElementById("svcStorage");
const storageExtra = document.getElementById("storageExtra");
const standardBoxes = document.getElementById("standardBoxes");
const intakeForm = document.getElementById("intakeForm");
const formStatus = document.getElementById("formStatus");

function updateStorageVisibility(){
  if (!svcStorage || !storageExtra || !standardBoxes) return;

  const on = !!svcStorage.checked;
  storageExtra.hidden = !on;

  if (on) standardBoxes.setAttribute("required", "required");
  else {
    standardBoxes.removeAttribute("required");
    standardBoxes.value = "";
  }
}
svcStorage?.addEventListener("change", updateStorageVisibility);
updateStorageVisibility();

intakeForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!intakeForm.checkValidity()){
    if (formStatus) formStatus.textContent = "Please complete all required fields and confirmations.";
    intakeForm.reportValidity();
    return;
  }

  const data = new FormData(intakeForm);
  const payload = Object.fromEntries(data.entries());
  console.log("Intake payload:", payload);

  if (formStatus){
    formStatus.textContent =
      "Request submitted (demo). To receive submissions by email, connect a backend later.";
  }
  intakeForm.reset();
  updateStorageVisibility();
});

// --- Footer policy modals ---
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const policies = {
  privacy: { title: "Privacy Policy", body: "<p>Effective date: February 4, 2026</p>" },
  terms: { title: "Terms of Service", body: "<p>Terms of Service content.</p>" },
  storage: { title: "Storage Policy", body: "<p>Storage Policy content.</p>" },
  liability: { title: "Liability Disclaimer", body: "<p>Liability Disclaimer content.</p>" }
};

function openModal(key){
  const p = policies[key];
  if (!p || !modal || !modalTitle || !modalBody) return;
  modalTitle.textContent = p.title;
  modalBody.innerHTML = p.body;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.getAttribute("data-modal")));
});

modalBackdrop?.addEventListener("click", closeModal);
modalClose?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("open")) closeModal();
});
