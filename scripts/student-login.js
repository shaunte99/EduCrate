document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const studentIdInput = form.studentId;
  const emailInput = form.email;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (studentIdInput.value.trim().length < 4) {
      showError(studentIdInput, 'Student ID must be at least 4 characters');
      valid = false;
    }

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      valid = false;
    }

    if (!valid) return;

    const studentId = studentIdInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();

    const studentData = [
      {
        id: 'KAYLA1022',
        email: 'kayla@student.educrate.com',
        profilePage: 'profile.html'
      }
    ];

    const match = studentData.find(
      s => s.id === studentId && s.email === email
    );

    if (match) {
      window.location.href = match.profilePage;
    } else {
      alert('Incorrect ID or email. Please try again.');
    }
  });

  function showError(input, message) {
    const error = document.createElement('p');
    error.className = 'error-msg';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(e => e.remove());
  }

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // TOTO WIDGET
  const toto = document.getElementById('totoWidget');
  const bubble = document.querySelector('.toto-bubble');

  toto.addEventListener('click', () => {
    bubble.textContent = "If the login doesn't work, make sure your ID and email match exactly.";
  });
});

