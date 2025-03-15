const express = require('express');
const app = express();

// Use the environment variable PORT or fallback to 3000 for local testing
const port = process.env.PORT || 3000;

// Serve the main `index.html` file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve the API endpoints
app.use('/api', require('./api/blackbox'));

// Catch-all route to handle unknown routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Listen on the specified port and bind to 0.0.0.0 for Scalingo compatibility
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
