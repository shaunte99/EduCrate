document.addEventListener("DOMContentLoaded", () => {
  const subjectButtons = document.querySelectorAll(".subject-card");
  const tutorsWrapper = document.getElementById("tutors-wrapper");
  const tutorsGrid = document.getElementById("tutors-grid");
  const tutorsTitle = document.getElementById("tutors-title");
  const closeBtn = document.getElementById("close-tutors");

  const tutorsData = [
    { name: "Tutor 1", img: "images/tutor1.jpg", subjects: ["english"], bio: "Experienced with early reading and phonics for Grades 1 to 3." },
    { name: "Tutor 2", img: "images/tutor2.jpg", subjects: ["english"], bio: "Focus on fun reading games and comprehension activities." },
    { name: "Tutor 1", img: "images/tutor1.jpg", subjects: ["mathematics"], bio: "Hands-on maths tutor focusing on number sense and shapes." },
    { name: "Tutor 2", img: "images/tutor2.jpg", subjects: ["mathematics"], bio: "Patient maths coach who uses play-based learning." },
    { name: "Tutor 1", img: "images/tutor1.jpg", subjects: ["lifeskills"], bio: "Works on social skills, routine and healthy classroom habits." },
    { name: "Tutor 2", img: "images/tutor2.jpg", subjects: ["lifeskills"], bio: "Creative activities to build confidence and emotional awareness." },
    { name: "Tutor 1", img: "images/tutor1.jpg", subjects: ["creative"], bio: "Art and music activities that boost fine motor skills." },
    { name: "Tutor 2", img: "images/tutor2.jpg", subjects: ["creative"], bio: "Fun craft lessons that support expression and learning." }
  ];

  function showTutorsFor(subjectKey) {
    tutorsGrid.innerHTML = "";
    const matches = tutorsData.filter(t => t.subjects.includes(subjectKey));

    if (matches.length === 0) {
      tutorsGrid.innerHTML = `<p class="no-tutors">No tutors available for this subject yet.</p>`;
    } else {
      matches.forEach(tutor => {
        const card = document.createElement("div");
        card.className = "tutor-card";
        card.innerHTML = `
          <div class="tutor-img-wrap">
            <img src="${tutor.img}" alt="${tutor.name}">
          </div>
          <div class="tutor-info">
            <h4>${tutor.name}</h4>
            <p class="tutor-bio">${tutor.bio}</p>
            <a href="tutors.html?tutor=${encodeURIComponent(tutor.name)}" class="btn-primary book-btn">Book Tutor</a>
          </div>
        `;
        tutorsGrid.appendChild(card);
      });
    }

    tutorsTitle.textContent = "Tutors for " + subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
    tutorsWrapper.classList.remove("hidden");
    tutorsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  subjectButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const subject = this.getAttribute("data-subject");
      showTutorsFor(subject);
    });
  });

  closeBtn.addEventListener("click", () => {
    tutorsWrapper.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
