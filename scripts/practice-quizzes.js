 document.addEventListener('DOMContentLoaded', () => {
  const quizzes = [
    { subject: "Mathematics", title: "Quadratic Equations", description: "Test your skills on solving quadratic equations.", link: "#" },
    { subject: "Afrikaans", title: "Grammar Practice", description: "Practice grammar rules and sentence formation.", link: "#" },
    { subject: "English", title: "Essay Writing", description: "Try this quiz on structuring perfect essays.", link: "#" },
    { subject: "Life Sciences", title: "Cell Biology", description: "Check your understanding of cells and organelles.", link: "#" },
    { subject: "History", title: "Cold War Events", description: "Test your knowledge on major Cold War events.", link: "#" },
    { subject: "Physical Education", title: "Fitness & Health", description: "Answer questions on health, nutrition and fitness.", link: "#" },
    { subject: "Creative Arts", title: "Art Techniques", description: "Practice questions on drawing and creativity.", link: "#" }
  ];

  const container = document.querySelector('.quizzes-container');

  quizzes.forEach(q => {
    const div = document.createElement('div');
    div.className = 'quiz-card';
    div.innerHTML = `
      <h3>${q.subject}: ${q.title}</h3>
      <p>${q.description}</p>
      <button onclick="window.location.href='${q.link}'">Take Quiz</button>
    `;
    container.appendChild(div);
  });
});
