// research.js - interactions for research page

document.addEventListener('DOMContentLoaded', () => {
  // collapse/expand toggles
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.paper-section');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      section.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? 'Show' : 'Hide';
    });
  });

  // collapse all
  document.getElementById('collapse-all')?.addEventListener('click', () => {
    document.querySelectorAll('.paper-section').forEach(s => {
      s.classList.add('collapsed');
      s.querySelector('.toggle-btn')?.setAttribute('aria-expanded','false');
      s.querySelector('.toggle-btn').textContent = 'Show';
    });
    window.scrollTo({top:0,behavior:'smooth'});
  });

  // Download PDF placeholder
  document.getElementById('download-pdf')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with your real PDF link
    const pdfUrl = 'docs/educrate-detection-framework.pdf';
    // quick graceful fallback if file missing
    window.open(pdfUrl, '_blank');
  });

  // Pipeline stage click: highlight + scroll
  document.querySelectorAll('.stage').forEach(stage => {
    stage.addEventListener('click', () => {
      document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
      stage.classList.add('active');
      stage.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  // LRP demo (simple deterministic scoring)
  const lrpCalc = document.getElementById('lrp-calc');
  const lrpReset = document.getElementById('lrp-reset');
  const lrpResult = document.getElementById('lrp-result');

  lrpCalc?.addEventListener('click', () => {
    const form = document.querySelector('.lrp-form');
    const checks = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    let score = 0;
    checks.forEach(c => { if (c.checked) score += 1; });

    // simple rules: 0 -> Low, 1-2 -> Moderate, 3+ -> High
    let label = 'Low Risk';
    let color = '#e8fff0';
    let text = 'No consistent indicators detected. Continue monitoring.';

    if (score === 1 || score === 2) {
      label = 'Moderate Risk';
      color = '#fff9e6';
      text = 'Some patterns found — recommend teacher verification and extra monitoring.';
    } else if (score >= 3) {
      label = 'High Risk';
      color = '#fff0f0';
      text = 'Multiple indicators present — initiate teacher checklist and PLP activation.';
    }

    lrpResult.innerHTML = `<div style="padding:10px;border-radius:8px;background:${color};font-weight:600">
      ${label} — ${text}
    </div>`;
    lrpResult.scrollIntoView({behavior:'smooth'});
  });

  lrpReset?.addEventListener('click', () => {
    document.querySelectorAll('.lrp-form input[type="checkbox"]').forEach(c => c.checked = false);
    lrpResult.innerHTML = '';
  });

  // TOTO widget interactions (basic)
  const totoOpen = document.getElementById('totoOpen');
  const totoChat = document.getElementById('totoChat');
  const totoClose = document.getElementById('totoClose');
  const totoBody = document.getElementById('totoBody');
  const totoInput = document.getElementById('totoInputPage');

  function appendMsg(text, who='bot') {
    const el = document.createElement('div');
    el.className = 'toto-msg ' + (who === 'bot' ? 'bot' : 'user');
    el.textContent = text;
    totoBody.appendChild(el);
    totoBody.scrollTop = totoBody.scrollHeight;
  }

  totoOpen?.addEventListener('click', () => {
    totoChat.style.display = 'flex';
    totoOpen.style.display = 'none';
    // focus input after open
    setTimeout(()=>{ totoInput?.focus(); }, 250);
  });

  totoClose?.addEventListener('click', () => {
    totoChat.style.display = 'none';
    totoOpen.style.display = 'block';
  });

  // simple local "understanding" for demo
  totoInput?.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    const v = totoInput.value.trim();
    if (!v) return;
    appendMsg(v, 'user');
    totoInput.value = '';

    // demo responses
    const query = v.toLowerCase();
    if (query.includes('lrp')) {
      appendMsg('LRP = Learning Risk Profile. Try the demo on this page to calculate Low / Moderate / High risk.');
    } else if (query.includes('pipeline') || query.includes('screen')) {
      appendMsg('The screening pipeline runs baseline screening → continuous monitoring → teacher confirmation → PLP activation.');
    } else if (query.includes('dyslexia')) {
      appendMsg('Dyslexia signals include slow reading, letter reversals, and irregular reading timing. We track these in EduCrate reading modules.');
    } else {
      appendMsg('Nice question. I can summarize any section — say "summarize introduction" or "explain validation".');
    }
  });

});
