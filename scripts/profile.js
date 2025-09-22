document.addEventListener('DOMContentLoaded', () => {
  // ------------------------
  // Animate Progress Bars
  // ------------------------
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  progressFills.forEach(bar => {
    const grade = bar.getAttribute('data-grade');
    setTimeout(() => {
      bar.style.width = grade + '%';
    }, 400);
  });

  // ------------------------
  // Modal / Meeting Form
  // ------------------------
  const modalBg = document.querySelector('.modal-bg');
  const meetingBtn = document.querySelector('.meeting-btn');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const meetingForm = document.querySelector('.modal form');

  if (meetingBtn && modalBg && meetingForm && modalCloseBtn) {
    // Open modal
    meetingBtn.addEventListener('click', () => {
      modalBg.classList.add('show');
    });

    // Close modal function
    function closeModal() {
      modalBg.classList.remove('show');
      meetingForm.reset();
    }

    // Close modal events
    modalCloseBtn.addEventListener('click', closeModal);
    modalBg.addEventListener('click', e => {
      if (e.target === modalBg) closeModal();
    });

    // Form submission with validation
    meetingForm.addEventListener('submit', e => {
      e.preventDefault();
      const meetingDate = meetingForm['meeting-date'].value;
      const meetingMsg = meetingForm['meeting-message'].value.trim();

      if (!meetingDate) {
        alert('⚠️ Please select a preferred meeting date.');
        return;
      }
      if (!meetingMsg) {
        alert('⚠️ Please enter a message for the teacher.');
        return;
      }

      alert(`✅ Meeting requested for ${meetingDate}!\nThe teacher will review your message:\n"${meetingMsg}"`);
      closeModal();
    });
  }

  // ------------------------
  // Optional: Floating Button Animation (if you want)
  // ------------------------
  const pulseButton = () => {
    if (!meetingBtn) return;
    meetingBtn.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
      { duration: 1200, iterations: Infinity }
    );
  };
  pulseButton();
});
