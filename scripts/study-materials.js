 document.addEventListener('DOMContentLoaded', () => {
  const materialsData = {
    "Mathematics": [
      { title: "Algebra Workbook", link: "#" },
      { title: "Quadratic Equations Notes", link: "#" },
      { title: "Graphs & Functions PDF", link: "#" }
    ],
    "Afrikaans": [
      { title: "Grammar Exercises", link: "#" },
      { title: "Reading Comprehension PDF", link: "#" },
      { title: "Essay Writing Tips", link: "#" }
    ],
    "Life Sciences": [
      { title: "Cell Diagrams PDF", link: "#" },
      { title: "Photosynthesis Notes", link: "#" },
      { title: "Lab Safety Guidelines", link: "#" }
    ],
    "History": [
      { title: "Cold War Slides", link: "#" },
      { title: "World War II Timeline", link: "#" },
      { title: "Key Historical Events PDF", link: "#" }
    ],
    "Physical Education": [
      { title: "Fitness Training Guide", link: "#" },
      { title: "Sports Techniques PDF", link: "#" },
      { title: "Weekly Exercise Plan", link: "#" }
    ],
    "Creative Arts": [
      { title: "Art Techniques PDF", link: "#" },
      { title: "Color Theory Notes", link: "#" },
      { title: "Drawing Exercises", link: "#" }
    ]
  };

  const container = document.getElementById('materials-container');

  Object.keys(materialsData).forEach(subject => {
    const section = document.createElement('div');
    section.className = 'subject-section';

    const title = document.createElement('h2');
    title.textContent = subject;
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'materials-grid';

    materialsData[subject].forEach(mat => {
      const card = document.createElement('div');
      card.className = 'material-card';
      card.innerHTML = `
        <div>
          <h4>${mat.title}</h4>
          <p>${subject}</p>
        </div>
        <a href="${mat.link}" target="_blank">Open</a>
      `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
});
