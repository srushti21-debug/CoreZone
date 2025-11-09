const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the project root (so index.html, css, js, images work)
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for SPA-like navigation
// Use a regex route to avoid path-to-regexp parsing issues with wildcard strings
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Gym-management server running at http://localhost:${PORT}`);
});
