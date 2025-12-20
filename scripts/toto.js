// scripts/toto.js
// Smarter local JSON-based Toto brain loader + flexible matching

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  let totoData = {};        // full JSON object
  let topics = [];         // flattened topics with keywords & responses

  // Load Toto data - adjust path if your folder structure differs
  fetch('../DATA/toto-responses.json')
    .then(r => {
      if (!r.ok) throw new Error(`Failed to fetch JSON: ${r.status}`);
      return r.json();
    })
    .then(data => {
      totoData = data;
      // Normalize topics into array: {id, keywords, responses}
      for (const topicId of Object.keys(totoData)) {
        const t = totoData[topicId];
        // Accept either object {keywords:[], responses:[]} or array of strings shorthand
        if (Array.isArray(t)) {
          // if array just treat as responses with no keywords
          topics.push({ id: topicId, keywords: [], responses: t });
        } else {
          topics.push({
            id: topicId,
            keywords: Array.isArray(t.keywords) ? t.keywords.map(k => k.toLowerCase()) : [],
            responses: Array.isArray(t.responses) ? t.responses : []
          });
        }
      }
      console.log("Toto brain loaded. Topics:", topics.length);
    })
    .catch(err => {
      console.error("Failed to load Toto data:", err);
      appendMessage("Toto failed to load knowledge data. Check console.", 'bot-message');
    });

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function appendMessage(text, className) {
    const msg = document.createElement('div');
    msg.classList.add('message', className);
    // allow simple formatting and line breaks
    msg.innerHTML = text.replace(/\n/g, '<br>');
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function normalize(text) {
    return text.toLowerCase().trim().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
  }

  function findBestMatch(input) {
    const norm = normalize(input);

    // 1) Exact topic id or exact keyword match
    for (const t of topics) {
      if (t.id.toLowerCase() === norm.replace(/\s+/g, '_')) {
        return t;
      }
    }

    // 2) Keyword inclusion scoring (how many keywords match)
    let best = null;
    let bestScore = 0;
    for (const t of topics) {
      if (!t.keywords || t.keywords.length === 0) continue;
      let score = 0;
      for (const kw of t.keywords) {
        if (norm.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        best = t;
      }
    }
    if (bestScore > 0) return best;

    // 3) Fallback substring match on topic id or response samples (looser)
    for (const t of topics) {
      if (norm.includes(t.id.toLowerCase().replace(/_/g, ' '))) return t;
    }

    // 4) Finally, check each responses text for fuzzy keywords (rare)
    for (const t of topics) {
      for (const r of t.responses) {
        const sr = r.toLowerCase();
        const tokens = norm.split(' ').slice(0, 4); // check first few tokens
        for (const tk of tokens) {
          if (sr.includes(tk) && tk.length > 3) {
            return t;
          }
        }
      }
    }

    return null;
  }

  function getReplyForInput(input) {
    const matched = findBestMatch(input);
    if (matched && matched.responses && matched.responses.length > 0) {
      // choose random response and slightly vary punctuation
      const resp = matched.responses[Math.floor(Math.random() * matched.responses.length)];
      return resp;
    }
    // fallback default topic named "default" if present
    const defaultTopic = topics.find(t => t.id === 'default' || t.id === 'fallback' || t.id === 'misc_default');
    if (defaultTopic && defaultTopic.responses.length > 0) {
      return defaultTopic.responses[Math.floor(Math.random() * defaultTopic.responses.length)];
    }
    return "Oops! I don't know that yet 😅";
  }

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user-message');
    userInput.value = '';

    appendMessage('Toto is thinking...', 'bot-message');

    // small human-like delay
    setTimeout(() => {
      // remove last typing indicator if it's the one added
      const last = chatBox.querySelector('.bot-message:last-child');
      if (last && last.textContent.includes('Toto is thinking')) last.remove();

      const reply = getReplyForInput(text);
      appendMessage(reply, 'bot-message');
    }, 600 + Math.floor(Math.random() * 700));
  }

});
