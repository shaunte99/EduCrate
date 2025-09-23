document.addEventListener('DOMContentLoaded', () => {
  // ------------------------
  // Dynamic Performance Data
  // ------------------------
  const performanceData = {
    GPA: "3.8 / 4.0",
    Attendance: 95,
    Deadlines: [
      { subject: "Mathematics", title: "Quiz", due: "2025-09-25" },
      { subject: "History", title: "Essay", due: "2025-09-28" },
      { subject: "Life Sciences", title: "Lab Report", due: "2025-09-30" }
    ],
    Achievements: ["Perfect Attendance Badge", "Math Excellence Badge"]
  };

  // Update cards
  const cards = document.querySelectorAll('.performance-cards .card');
  cards.forEach(card => {
    const title = card.querySelector('h3').innerText;
    if (title === "GPA") card.querySelector('p').innerText = performanceData.GPA;
    if (title === "Attendance") card.querySelector('p').innerText = performanceData.Attendance + "%";
    if (title === "Upcoming Deadlines") {
      card.querySelector('p').innerHTML = performanceData.Deadlines.map(d => `${d.subject} - ${d.title} (${d.due})`).join("<br>");
    }
    if (title === "Achievements") {
      card.querySelector('p').innerHTML = performanceData.Achievements.join("<br>");
    }
  });

  // ------------------------
  // Notifications
  // ------------------------
  const notifications = [
    "📌 Math Quiz feedback received",
    "📌 History essay graded: 88%",
    "📌 Life Sciences tutor available this week"
  ];

  const notifContainer = document.querySelector('.notifications ul');
  notifications.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    notifContainer.appendChild(li);
  });

  // ------------------------
  // Floating Tutor Button
  // ------------------------
  const floatingBtn = document.createElement('button');
  floatingBtn.className = 'meeting-btn';
  floatingBtn.innerHTML = '📚';
  document.body.appendChild(floatingBtn);

  floatingBtn.addEventListener('click', () => {
    alert("✨ Request a Tutor or Message your Teacher from here!");
  });

  // ------------------------
  // Optional: Animate Attendance Bar (if visual bar added later)
  // ------------------------
});
