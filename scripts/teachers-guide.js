document.addEventListener('DOMContentLoaded', () => {
  // Button animation
  const contactBtn = document.getElementById('contact-support');
  contactBtn.addEventListener('click', () => {
    alert('✅ Support request sent! Our EduCrate team will contact you shortly.');
  });

  // Animate cards on scroll
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
