import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Load Toto responses JSON
const responses = JSON.parse(fs.readFileSync('./toto-responses.json', 'utf-8'));

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  // Search for exact or keyword match
  const lowerMsg = message.toLowerCase();
  let reply = "Hmm 🤔 I don't know that yet, but I'm learning every day!";

  for (let r of responses) {
    if (lowerMsg.includes(r.question.toLowerCase())) {
      reply = r.answer;
      break;
    }
  }

  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
