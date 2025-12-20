// tutors.js
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const tutorNameInput = document.getElementById('tutorName');
  const openBookBtn = document.getElementById('open-book-btn');
  const openBookCTA = document.getElementById('open-book-cta');
  const bookZwonakaBtn = document.getElementById('book-zwonaka');
  const cardBookBtns = document.querySelectorAll('.book-card');
  const whatsappBtn = document.getElementById('whatsapp-send');
  const closeSuccessBtn = document.getElementById('close-success');

  // helpers
  function openModal(tutorName = '') {
    modal.setAttribute('aria-hidden','false');
    // set tutor name
    tutorNameInput.value = tutorName || 'Any Tutor';
    // show form, hide success
    bookingForm.style.display = 'block';
    bookingSuccess.hidden = true;
    // small focus
    setTimeout(()=> document.getElementById('parentName').focus(), 120);
  }

  function closeModal() {
    modal.setAttribute('aria-hidden','true');
  }

  // open modal from header/book CTA
  openBookBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('Any Tutor'); });
  openBookCTA?.addEventListener('click', (e) => { e.preventDefault(); openModal('Any Tutor'); });

  // open modal for Zwonaka
  bookZwonakaBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('Zwonaka'); });

  // open modal from cards
  cardBookBtns?.forEach(btn => btn.addEventListener('click', (e) => {
    const name = btn.dataset.tutor || btn.closest('.tutor-card')?.dataset?.name || 'Any Tutor';
    openModal(name);
  }));

  // close handlers
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // form validation & submit (simulated)
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation
    const parentName = document.getElementById('parentName').value.trim();
    const childGrade = document.getElementById('childGrade').value;
    const contact = document.getElementById('contact').value.trim();

    let ok = true;
    if (!parentName){ ok=false; alert('Please enter your name.'); document.getElementById('parentName').focus(); return; }
    if (!childGrade){ ok=false; alert('Please select the child\'s grade.'); document.getElementById('childGrade').focus(); return; }
    if (!contact){ ok=false; alert('Please provide a phone number or email for contact.'); document.getElementById('contact').focus(); return; }

    if (ok) {
      // show success panel (simulate server)
      bookingForm.style.display = 'none';
      bookingSuccess.hidden = false;
    }
  });

  // close success
  closeSuccessBtn?.addEventListener('click', () => {
    closeModal();
  });

  // WhatsApp send - build message from form fields
  whatsappBtn?.addEventListener('click', (e) => {
    const tutor = document.getElementById('tutorName').value || 'BrightPath tutor';
    const parent = document.getElementById('parentName').value || '';
    const grade = document.getElementById('childGrade').value || '';
    const subject = document.getElementById('subject').value || '';
    const contactText = document.getElementById('contact').value || '';
    const message = encodeURIComponent(
      `Hi BrightPath, I'd like to book ${tutor}. Parent: ${parent}. Grade: ${grade}. Subject: ${subject}. Contact: ${contactText}.`
    );
    const waUrl = `https://wa.me/27845325730?text=${message}`;
    window.open(waUrl, '_blank');
  });

  // small accessibility: close modal using ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeModal();
  });

  // ---- reveal on scroll (simple) ----
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => revealObserver.observe(r));

  // subtle hover tilt for cards
  document.querySelectorAll('.tutor-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`;
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.3s ease';
    });
  });

  // mobile menu toggle (if you add a mobile menu later)
  const mobileToggle = document.querySelector('.mobile-menu-icon');
  const nav = document.querySelector('.nav-links');
  mobileToggle?.addEventListener('click', () => {
    if (!nav) return;
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = '#fff';
    nav.style.position = 'absolute';
    nav.style.right = '16px';
    nav.style.top = '70px';
    nav.style.padding = '12px';
    nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
  });
});
