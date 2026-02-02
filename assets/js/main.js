(function(){
  // Active nav highlighting
  const path = window.location.pathname.replace(/\/+$/, "");
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href = a.getAttribute('href').replace(/\/+$/, "");
    if (href && (path === href || (href !== "/" && path.endsWith(href)))) {
      a.classList.add('active');
    }
  });

  // Back button (works even if no history - fallback to home)
  const backBtn = document.querySelector('[data-back]');
  if (backBtn){
    backBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      if (window.history.length > 1) window.history.back();
      else window.location.href = "/";
    });
  }

  // Intake form logic
  const storageToggle = document.querySelector('[data-storage-toggle]');
  const storageBlock = document.querySelector('[data-storage-block]');
  if (storageToggle && storageBlock){
    const sync = ()=> storageBlock.style.display = storageToggle.checked ? "block" : "none";
    storageToggle.addEventListener('change', sync);
    sync();
  }

  const form = document.querySelector('[data-intake-form]');
  if (form){
    form.addEventListener('submit', (e)=>{
      const requiredChecks = form.querySelectorAll('[data-required-check]');
      let ok = true;

      requiredChecks.forEach(wrap=>{
        const cb = wrap.querySelector('input[type="checkbox"]');
        const err = wrap.querySelector('.error');
        if (cb && err){
          const valid = cb.checked;
          err.classList.toggle('show', !valid);
          ok = ok && valid;
        }
      });

      // If you didn't set a real backend endpoint, prevent submit:
      const action = form.getAttribute('action') || "";
      if (!action.trim()){
        e.preventDefault();
        alert("Set your form endpoint (Formspree / server) in the form 'action' attribute, then try again.");
        return;
      }

      if (!ok){
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
})();

