// --- Active section highlighting (top nav only) ---
const navLinks = Array.from(document.querySelectorAll("[data-section]"));
const observedSections = Array.from(document.querySelectorAll("[data-observe]"));

function setActive(sectionId){
  navLinks.forEach(a => {
    const match = a.getAttribute("data-section") === sectionId;
    a.classList.toggle("active", match);
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

      <h4>1. Information We Collect</h4>
      <ul>
        <li>Contact details (such as name, email address, phone number)</li>
        <li>Business information (company name, seller type, marketplace)</li>
        <li>Shipment estimates (number of boxes, total units)</li>
        <li>Selected services (prep, receiving, storage)</li>
        <li>Files you choose to upload (for example, labels or packing lists), if enabled</li>
        <li>Technical data such as IP address and basic server logs for security and abuse prevention</li>
      </ul>

      <h4>2. How We Use Your Information</h4>
      <ul>
        <li>Review and respond to your intake request</li>
        <li>Provide quotes and confirm scope of services</li>
        <li>Coordinate receiving, prep, and storage workflows</li>
        <li>Communicate about scheduling, requirements, and operational updates</li>
        <li>Maintain internal records for operations, billing, and compliance</li>
        <li>Prevent fraud, abuse, or unauthorized access</li>
      </ul>

      <h4>3. Data Sharing</h4>
      <p>We do not sell your personal information. We may share information only when necessary to comply with legal obligations, protect rights/safety, or work with required service providers under confidentiality.</p>

      <h4>4. Data Storage and Retention</h4>
      <p>Information submitted through our intake forms is stored and retained only as long as reasonably necessary for operations, recordkeeping, and legal/compliance purposes.</p>

      <h4>5. Security</h4>
      <p>We use reasonable safeguards, but no method of transmission or storage is completely secure.</p>

      <h4>6. Your Choices</h4>
      <ul>
        <li>Access or update the information you submitted</li>
        <li>Request deletion where legally and operationally feasible</li>
        <li>Stop receiving non-essential communications</li>
      </ul>

      <h4>7. Cookies and Analytics</h4>
      <p>We may use minimal cookies or basic analytics to improve the website and prevent abuse.</p>

      <h4>8. International Visitors</h4>
      <p>If you access our website from outside the United States, your information may be processed and stored in the United States.</p>

      <h4>9. Children’s Privacy</h4>
      <p>Our services are intended for business users and are not directed to children under the age of 13.</p>

      <h4>10. Contact</h4>
      <p>Email: support@joynhappiness.com<br/>Company: PrepNest NY LLC, Brooklyn, NY</p>

      <h4>11. Updates to This Policy</h4>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
    `
  },

  terms: {
    title: "Terms of Service",
    body: `
      <p>PrepNest NY LLC is an independent service provider and is not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. or any of its affiliates.</p>
      <p>These services are provided by PrepNest NY LLC, a New York limited liability company (“PrepNest NY”, “we”, “us”).</p>
      <p>PrepNest NY provides Amazon FBA prep services, including labeling, packing, inspection, and temporary storage of boxed goods.</p>
      <p>By submitting an intake request or using our services, you agree to these Terms of Service.</p>

      <h4>Limitation of Liability</h4>
      <p>PrepNest NY is not responsible for manufacturer defects, hidden damage, or issues caused prior to receiving inventory.</p>

      <h4>Payment</h4>
      <p>All services are invoiced based on completed work. Outbound shipments are released only after payment is received.</p>

      <h4>Right to Decline</h4>
      <p>PrepNest NY reserves the right to decline any shipment or request that does not meet our operational or safety requirements.</p>
    `
  },

  storage: {
    title: "Storage Policy",
    body: `
      <p>PrepNest NY LLC offers short-term storage to support inventory processing and outbound shipment scheduling.</p>

      <h4>Storage Rules</h4>
      <ul>
        <li>Storage is billed per box</li>
        <li>Storage is short-term only</li>
        <li>Weekly or monthly billing applies</li>
        <li>Standard box size and weight limits apply</li>
      </ul>

      <h4>Key Protection</h4>
      <p>Storage is intended for temporary holding during prep and is not designed for long-term warehousing.</p>

      <h4>Standard Storage Box Specifications</h4>
      <ul>
        <li>Maximum dimensions: 24" x 18" x 18"</li>
        <li>Maximum weight: 50 lbs per box</li>
        <li>Boxes must be fully sealed and stackable</li>
        <li>Boxes must contain non-hazardous goods only</li>
      </ul>

      <h4>Additional</h4>
      <p>Boxes exceeding standard size or weight limits may be subject to additional charges or refusal.</p>
    `
  },

  liability: {
    title: "Liability Disclaimer",
    body: `
      <p>PrepNest NY LLC exercises reasonable care in handling inventory but does not insure goods against loss, theft, or damage unless otherwise agreed in writing.</p>
      <p>Clients are responsible for maintaining appropriate inventory insurance.</p>
      <p>PrepNest NY LLC is not liable for delays caused by carriers, Amazon, weather, or other events beyond our control.</p>
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
