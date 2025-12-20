// ================= HERO FADE-IN =================
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image');
  heroText.classList.add('visible');
  heroImage.classList.add('visible');
});

// ================= LOGO CLICK SCALE =================
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  logo.style.transform = 'scale(1.2)';
  setTimeout(() => {
    logo.style.transform = 'scale(1.1)';
  }, 200);
});

// ================= SUBJECTS CLICK INTERACTION =================
const gradeCards = document.querySelectorAll('.grade-card');
const subjectsPlaceholder = document.querySelector('.subjects-placeholder');

gradeCards.forEach(card => {
  card.addEventListener('click', () => {
    const phase = card.dataset.phase;
    subjectsPlaceholder.innerHTML = `<p class="fade-text">You clicked <strong>${phase} phase</strong>. Subjects will show here soon!</p>`;
    const text = subjectsPlaceholder.querySelector('.fade-text');
    text.style.opacity = 0;
    text.style.transform = 'translateY(10px)';
    setTimeout(() => {
      text.style.transition = 'all 0.5s ease';
      text.style.opacity = 1;
      text.style.transform = 'translateY(0)';
    }, 50);

    // card click animation
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
      card.style.transform = '';
    }, 200);
  });
});

// ================= MOBILE MENU TOGGLE =================
const menuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon?.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    navLinks.style.opacity = 0;
    navLinks.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      navLinks.style.transition = 'all 0.4s ease';
      navLinks.style.opacity = 1;
      navLinks.style.transform = 'translateY(0)';
    }, 50);
  } else {
    navLinks.style.transition = 'all 0.3s ease';
    navLinks.style.opacity = 0;
    navLinks.style.transform = 'translateY(-20px)';
  }
});

// ================= GOOGLE MAP =================
function initMap() {
  const schoolLocation = { lat: -26.0148, lng: 28.0876 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: schoolLocation,
    zoom: 15,
  });

  new google.maps.Marker({
    position: schoolLocation,
    map: map,
    title: "Constanta Kloof Primary School"
  });
}

window.addEventListener('load', () => {
  if (document.getElementById('map')) initMap();
});

// ================= TESTIMONIAL SLIDER =================
const testimonials = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('nextTestimonial');
const prevBtn = document.getElementById('prevTestimonial');
let current = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove('active', 'exit-left');
    if (i === index) {
      t.classList.add('active');
    } else if (i < index) {
      t.classList.add('exit-left');
    }
  });
}

nextBtn?.addEventListener('click', () => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
});

prevBtn?.addEventListener('click', () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showTestimonial(current);
});

// Auto-rotate testimonials every 6 seconds
setInterval(() => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}, 6000);

// Initialize first testimonial
showTestimonial(current);
