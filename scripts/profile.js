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
    meetingBtn.addEventListener('click', () => {
      modalBg.classList.add('show');
    });

    function closeModal() {
      modalBg.classList.remove('show');
      meetingForm.reset();
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalBg.addEventListener('click', e => {
      if (e.target === modalBg) closeModal();
    });

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
  // Assignment Tracker
  // ------------------------
  const assignments = [
    { subject: "Mathematics", title: "Algebra Homework", due: "2025-09-30", status: "Submitted", grade: "75%" },
    { subject: "History", title: "Essay on World War II", due: "2025-10-02", status: "Pending", grade: "-" },
    { subject: "Life Sciences", title: "Lab Report - Cells", due: "2025-10-05", status: "Graded", grade: "88%" },
  ];

  const assignmentContainer = document.querySelector('.assignments-list');
  if (assignmentContainer) {
    assignments.forEach(a => {
      const li = document.createElement('li');
      li.className = "assignment-item";
      li.innerHTML = `
        <strong>${a.subject}</strong>: ${a.title}<br/>
        <span>Due: ${a.due}</span> | 
        <span>Status: ${a.status}</span> | 
        <span>Grade: ${a.grade}</span>
      `;
      assignmentContainer.appendChild(li);
    });
  }

  // ------------------------
  // Weekly Summary
  // ------------------------
  const weeklySummary = {
    Mathematics: "Covered quadratic equations and practiced graph plotting.",
    English: "Focused on essay writing techniques and comprehension.",
    LifeSciences: "Studied photosynthesis and cellular respiration.",
    History: "Analyzed key events of the Cold War.",
  };

  const summaryContainer = document.querySelector('.weekly-summary');
  if (summaryContainer) {
    Object.keys(weeklySummary).forEach(subject => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${subject}:</strong> ${weeklySummary[subject]}`;
      summaryContainer.appendChild(p);
    });
  }

  // ------------------------
  // Pulse Animation for Floating Button
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
