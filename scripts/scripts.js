// Toto Widget
const totoBtn = document.getElementById('toto-btn');
const totoChat = document.getElementById('toto-chat');
const totoClose = document.getElementById('toto-close');
const totoInput = document.getElementById('toto-input');
const totoMessages = totoChat.querySelector('.toto-messages');

totoBtn.addEventListener('click', () => {
  totoChat.style.display = 'flex';
});

totoClose.addEventListener('click', () => {
  totoChat.style.display = 'none';
});

totoInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter' && totoInput.value.trim() !== ''){
    const userMsg = document.createElement('p');
    userMsg.textContent = totoInput.value;
    userMsg.style.background = '#d1e7ff';
    totoMessages.appendChild(userMsg);

    // Example AI response
    const botMsg = document.createElement('p');
    botMsg.textContent = `Toto says: I see you typed "${totoInput.value}"`;
    totoMessages.appendChild(botMsg);

    totoInput.value = '';
    totoMessages.scrollTop = totoMessages.scrollHeight;
  }
});
