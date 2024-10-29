const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 3000;

// Fortnite API endpoint
const FORTNITE_API_URL = 'https://fortnite-api.com/v2/stats/br/v2';

app.get('/api/fortnite/stats', async (req, res) => {
    const { username, platform } = req.query;
    
    if (!username || !platform) {
        return res.status(400).json({ 
            error: 'Missing required parameters. Please provide username and platform' 
        });
    }

    try {
        const response = await axios.get(`${FORTNITE_API_URL}`, {
            params: {
                name: username,
                accountType: platform
            },
            headers: {
                // You'll need to sign up for an API key at fortnite-api.com
                'Authorization': '7b053901-6d13-4890-830c-af65d48d98dd'
            }
        });

        const stats = response.data.data;
        res.json({
            success: true,
            username: username,
            platform: platform,
            stats: {
                overall: stats.stats.all.overall,
                solo: stats.stats.all.solo,
                duo: stats.stats.all.duo,
                squad: stats.stats.all.squad
            }
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch Fortnite stats', 
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
