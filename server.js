const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve all static files from the project root
app.use(express.static(path.join(__dirname)));

// Fallback: always return index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Pass+ running → http://localhost:${PORT}`);
});
