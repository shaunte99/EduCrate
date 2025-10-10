document.addEventListener('DOMContentLoaded', () => {
  // Subjects and Progress
  const subjects = [
    { name: "Mathematics", grade: 82 },
    { name: "English", grade: 88 },
    { name: "Afrikaans", grade: 85 },
    { name: "Life Sciences", grade: 80 },
    { name: "History", grade: 75 },
    { name: "Creative Arts", grade: 90 },
    { name: "Physical Education", grade: 95 },
  ];

  const subjectContainer = document.querySelector('.subject-cards');
  subjects.forEach(sub => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
      <h3>${sub.name}</h3>
      <div class="progress-bar">
        <div class="progress-bar-fill" data-grade="${sub.grade}"></div>
      </div>
      <p>Current Grade: ${sub.grade}%</p>
    `;
    subjectContainer.appendChild(card);
  });

  // Animate Progress Bars
  const fills = document.querySelectorAll('.progress-bar-fill');
  fills.forEach(bar => {
    const grade = bar.getAttribute('data-grade');
    setTimeout(() => {
      bar.style.width = grade + '%';
    }, 300);
  });

  // Weekly Focus
  const weeklyFocus = [
    "Mathematics: Quadratic equations & graphing",
    "English: Essay writing & comprehension",
    "Afrikaans: Grammar exercises & vocabulary",
    "Life Sciences: Photosynthesis & cell structure",
    "History: Cold War analysis",
    "Creative Arts: Drawing & painting techniques"
  ];

  const focusList = document.querySelector('.weekly-focus-list');
  weeklyFocus.forEach(focus => {
    const li = document.createElement('li');
    li.textContent = focus;
    focusList.appendChild(li);
  });

  // Academic Highlights
  const highlights = [
    "Top scorer in Mathematics this week: Kayla",
    "Creative Arts project featured in school newsletter",
    "Life Sciences lab report scored 95%",
    "History debate team won regional finals"
  ];

  const highlightsContainer = document.querySelector('.highlights-container');
  highlights.forEach(h => {
    const div = document.createElement('div');
    div.className = 'highlight-card';
    div.textContent = h;
    highlightsContainer.appendChild(div);
  });
});
