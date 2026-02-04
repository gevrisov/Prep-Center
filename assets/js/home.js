(() => {
  // Dropdown menu
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-menu]");

  const closeMenu = () => {
    if (!menu || !menuBtn) return;
    menu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    if (!menu || !menuBtn) return;
    const isOpen = menu.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  };

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    menu.addEventListener("click", (e) => e.stopPropagation());
  }

  // Modal
  const overlay = document.querySelector("[data-modal-overlay]");
  const modal = document.querySelector("[data-modal]");
  const closeBtn = document.querySelector("[data-modal-close]");
  const titleEl = document.querySelector("[data-modal-title]");
  const bodyEl = document.querySelector("[data-modal-body]");

  const MODAL_CONTENT = {
    prep: {
      title: "Prep Services",
      body: `
        <p><b>Prep</b> is billed per unit. Typical tasks:</p>
        <ul>
          <li>FNSKU labeling</li>
          <li>Polybagging / warning labels (when required)</li>
          <li>Bubble wrap, protective packaging</li>
          <li>Bundling / sets (as instructed)</li>
        </ul>
      `
    },
    receiving: {
      title: "Receiving & Inspection",
      body: `
        <p><b>Receiving & inspection</b> is billed per box and includes:</p>
        <ul>
          <li>Box count & intake logging</li>
          <li>Visual inspection (damage check)</li>
          <li>Discrepancy notes (if something is off)</li>
        </ul>
      `
    },
    storage: {
      title: "Temporary Storage",
      body: `
        <p><b>Short-term</b> storage only. Billed per box:</p>
        <ul>
          <li>Storage while prep is in progress</li>
          <li>Storage while outbound is scheduled</li>
        </ul>
        <p><b>Long-term storage is not offered.</b></p>
      `
    },
    pricing: {
      title: "Pricing Overview",
      body: `
        <p>High-level billing model:</p>
        <ul>
          <li><b>Prep</b> — billed per unit</li>
          <li><b>Receiving</b> — billed per box</li>
          <li><b>Storage</b> — billed per box (short-term)</li>
        </ul>
        <p>Outbound release happens <b>after payment</b>.</p>
      `
    }
  };

  const openModal = (key) => {
    const data = MODAL_CONTENT[key];
    if (!data || !overlay || !modal || !titleEl || !bodyEl) return;

    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.body;

    overlay.hidden = false;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!overlay || !modal) return;
    overlay.hidden = true;
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-modal");
      closeMenu();
      openModal(key);
    });
  });

  if (overlay) overlay.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
