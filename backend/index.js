const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate', (req, res) => {
  const mood = req.query.mood || 'unknown';
  console.log(`Generating for mood: ${mood}`);
  res.json({ file: '/sample.mp3' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});