// ================= HERO FADE-IN =================
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.booking-hero h1');
  const heroText = document.querySelector('.booking-hero p');
  heroTitle.style.opacity = 0;
  heroText.style.opacity = 0;
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease';
    heroText.style.transition = 'opacity 1s ease';
    heroTitle.style.opacity = 1;
    heroText.style.opacity = 1;
  }, 100);
});

// ================= MODE SELECTION =================
const modeCards = document.querySelectorAll('.mode-card');
let selectedMode = '';

modeCards.forEach(card => {
  card.addEventListener('click', () => {
    modeCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedMode = card.dataset.mode;
  });
});

// ================= FORM SUBMISSION =================
const bookingForm = document.getElementById('bookingForm');
const messageDiv = document.querySelector('.booking-message');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const grade = document.getElementById('grade').value;
  const date = document.getElementById('date').value;

  if (!name || !email || !phone || !grade || !date || !selectedMode) {
    messageDiv.textContent = "Please fill all fields and select a mode.";
    messageDiv.style.color = 'red';
    return;
  }

  // ================= EMAIL & WHATSAPP MESSAGE =================
  const subject = encodeURIComponent("BrightPath Booking Request");
  const body = encodeURIComponent(
    `Hello BrightPath Team,\n\n` +
    `I would like to book a tutoring session with the following details:\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Grade: ${grade}\n` +
    `Date: ${date}\n` +
    `Mode: ${selectedMode}\n\n` +
    `Thank you!`
  );

  // Email link
  const mailtoLink = `mailto:brightpathaftercare@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink);

  // Optional: WhatsApp link
  const waMessage = encodeURIComponent(
    `BrightPath Booking Request:\nName: ${name}\nGrade: ${grade}\nDate: ${date}\nMode: ${selectedMode}\nPhone: ${phone}`
  );
  const waLink = `https://wa.me/27845325730?text=${waMessage}`;
  // Uncomment the next line if you want to open WhatsApp automatically
  // window.open(waLink);

  // Feedback message
  messageDiv.textContent = "Booking request sent successfully!";
  messageDiv.style.color = '#007ea7';

  // Reset form and selection
  bookingForm.reset();
  modeCards.forEach(c => c.classList.remove('selected'));
  selectedMode = '';
});
