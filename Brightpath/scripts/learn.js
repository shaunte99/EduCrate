document.addEventListener('DOMContentLoaded', () => {
  // ================= FADE-IN ON SCROLL =================
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // ================= CURRICULUM CARD CLICK =================
  const curriculumCards = document.querySelectorAll('.curriculum-card');
  curriculumCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active from all
      curriculumCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Show extra details if any
      const detail = card.querySelector('.curriculum-detail');
      if(detail) {
        detail.classList.toggle('show');
      }
    });
  });

  // ================= SMOOTH SCROLL 
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ================= ACCORDION BENEFITS =================
  const benefitItems = document.querySelectorAll('.benefits ul li');
  benefitItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
    });
  });
});
