 document.addEventListener('DOMContentLoaded', () => {
  // ------------------------
  // Academic Progress
  // ------------------------
  const subjects = [
    { name: "Mathematics", grade: 78, comments: "Strong analytical skills; practice problem-solving more." },
    { name: "Afrikaans", grade: 85, comments: "Excellent grasp of language and grammar." },
    { name: "Life Sciences", grade: 80, comments: "Shows curiosity and understanding of concepts." },
    { name: "History", grade: 72, comments: "Keep reviewing key events." },
    { name: "Physical Education", grade: 90, comments: "Excellent participation." },
  ];

  const progressContainer = document.querySelector('.progress-cards');
  let totalGrades = 0;

  subjects.forEach(sub => {
    totalGrades += sub.grade;
    const card = document.createElement('div');
    card.className = 'progress-card';
    card.innerHTML = `
      <h3>${sub.name}</h3>
      <div class="progress-bar">
        <div class="progress-bar-fill" data-grade="${sub.grade}"></div>
      </div>
      <p><em>${sub.comments}</em></p>
    `;
    progressContainer.appendChild(card);
  });

  const progressFills = document.querySelectorAll('.progress-bar-fill');
  progressFills.forEach(bar => {
    const grade = bar.getAttribute('data-grade');
    setTimeout(() => {
      bar.style.width = grade + '%';
    }, 400);
  });

  // ------------------------
  // Overview Cards
  // ------------------------
  const avgGrade = Math.round(totalGrades / subjects.length);
  document.getElementById('avg-grade').innerText = avgGrade + '%';
  document.getElementById('assignments-due').innerText = '3';
  document.getElementById('quizzes-due').innerText = '2';
  document.getElementById('attendance').innerText = '94%';

  // ------------------------
  // Assignments Tracker
  // ------------------------
  const assignments = [
    { subject: "Mathematics", title: "Algebra Homework", due: "2025-09-30", status: "Submitted", grade: "75%" },
    { subject: "History", title: "Essay on World War II", due: "2025-10-02", status: "Pending", grade: "-" },
    { subject: "Life Sciences", title: "Lab Report - Cells", due: "2025-10-05", status: "Graded", grade: "88%" },
  ];

  const assignmentContainer = document.querySelector('.assignments-list');
  assignments.forEach(a => {
    const li = document.createElement('li');
    li.className = `assignment-item ${a.status.toLowerCase()}`;
    li.innerHTML = `<strong>${a.subject}</strong>: ${a.title} | Due: ${a.due} | Status: ${a.status} | Grade: ${a.grade}`;
    assignmentContainer.appendChild(li);
  });

  // ------------------------
  // Quizzes
  // ------------------------
  const quizzes = [
    { subject: "Mathematics", title: "Quadratic Equations Quiz", due: "2025-09-28" },
    { subject: "Afrikaans", title: "Grammar Practice Quiz", due: "2025-09-29" },
  ];

  const quizzesContainer = document.querySelector('.quizzes-list');
  quizzes.forEach(q => {
    const li = document.createElement('li');
    li.className = 'quiz-item';
    li.innerHTML = `<strong>${q.subject}</strong>: ${q.title} | Due: ${q.due}`;
    quizzesContainer.appendChild(li);
  });

  // ------------------------
  // Study Materials
  // ------------------------
  const materials = [
    { subject: "Mathematics", title: "Algebra Workbook", link: "#" },
    { subject: "Life Sciences", title: "Cell Diagrams PDF", link: "#" },
    { subject: "History", title: "Cold War Slides", link: "#" },
  ];

  const materialsGrid = document.querySelector('.materials-grid');
  materials.forEach(m => {
    const div = document.createElement('div');
    div.className = 'material-card';
    div.innerHTML = `<h4>${m.title}</h4><p>${m.subject}</p><a href="${m.link}" class="btn outline">Open</a>`;
    materialsGrid.appendChild(div);
  });

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
  Object.keys(weeklySummary).forEach(subject => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${subject}:</strong> ${weeklySummary[subject]}`;
    summaryContainer.appendChild(p);
  });

  // ------------------------
  // Book Tutor Button
  // ------------------------
  const bookBtn = document.getElementById('book-tutor');
  bookBtn.addEventListener('click', () => {
    alert('✅ Tutor booking requested! The teacher will contact you.');
  });
});
