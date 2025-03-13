const express = require('express');
const axios = require('axios');

// Create an Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

/**
 * GET /blackbox
 * Fetch response from the external API.
 * Query parameter: q (query string)
 */
app.get('/blackbox', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Please provide a query (q)\nPako Response venna query ekk diyn.' });
    }

    try {
        // Fetch data from the external API
        const response = await axios.get(`https://bk9.fun/ai/blackbox?q=${encodeURIComponent(q)}`);
        const data = response.data;

        // Add owner attribution
        const result = {
            status: true,
            owner: '@sadiya_tech',
            result: data.BK9 || data.message || 'No response from the external API',
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data from the external API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
