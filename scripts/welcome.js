const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if(username === "shaunmatsetela@educrate.com" && password === "12345edu"){
    // Successful login - redirect to main page
    window.location.href = "index.html";
  } else {
    // Show error message
    errorMsg.textContent = "Invalid username or password!";
  }
});
