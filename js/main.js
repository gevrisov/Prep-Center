// --- Intake form behavior (only works when form exists) ---
const svcStorage = document.getElementById("svcStorage");
const storageExtra = document.getElementById("storageExtra");
const standardBoxes = document.getElementById("standardBoxes");
const intakeForm = document.getElementById("intakeForm");
const formStatus = document.getElementById("formStatus");

function updateStorageVisibility(){
  if (!svcStorage || !storageExtra || !standardBoxes) return;

  const on = !!svcStorage.checked;
  storageExtra.hidden = !on;

  if (on) {
    standardBoxes.setAttribute("required", "required");
  } else {
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
      "Request submitted (demo). To receive submissions by email, connect a backend (e.g., Formspree/Netlify/Cloudflare) later.";
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
  privacy: {
    title: "Privacy Policy",
    body: `
      <p><strong>Effective date:</strong> February 4, 2026</p>
      <p>This Privacy Policy explains how PrepNest NY LLC (“PrepNest NY”, “we”, “us”) collects, uses, and protects information submitted through our website and intake forms.</p>
      <h4>Information We Collect</h4>
      <ul>
        <li>Contact details (name, email, phone)</li>
        <li>Business info (marketplace, seller type)</li>
        <li>Shipment estimates (boxes, units)</li>
        <li>Selected services (prep, receiving, storage)</li>
      </ul>
      <h4>Contact</h4>
      <p>Email: support@joynhappiness.com<br/>Company: PrepNest NY LLC, Brooklyn, NY</p>
    `
  },
  terms: {
    title: "Terms of Service",
    body: `
      <p>PrepNest NY LLC is an independent service provider and is not affiliated with Amazon.</p>
      <p>By submitting an intake request or using our services, you agree to these Terms.</p>
      <h4>Payment</h4>
      <p>Outbound shipments are released only after payment is received.</p>
      <h4>Right to Decline</h4>
      <p>We reserve the right to decline any shipment that does not meet operational requirements.</p>
    `
  },
  storage: {
    title: "Storage Policy",
    body: `
      <p>Short-term storage is available to support processing and outbound scheduling.</p>
      <ul>
        <li>Storage billed per box</li>
        <li>Short-term only</li>
        <li>Standard box size/weight limits apply</li>
      </ul>
    `
  },
  liability: {
    title: "Liability Disclaimer",
    body: `
      <p>PrepNest NY LLC is not responsible for manufacturer defects or issues that occurred prior to receiving inventory.</p>
      <p>Clients are responsible for maintaining appropriate inventory insurance.</p>
    `
  }
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