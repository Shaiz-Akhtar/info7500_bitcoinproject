const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Define the API endpoint URL
const apiUrl = 'https://api.bitaps.com/btc/v1/blockchain/address/transactions/1QHDy8M5HADdb7RGhPzTgUsM4HxabCD9LY';

// Route to fetch and return the UTXO data from the API
app.get('/', async (req, res) => {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get(apiUrl);

        // Filter out UTXOs (transactions with positive amounts)
        const utxos = response.data.data.list.filter(transaction => transaction.amount > 0);

        // Return only the UTXO data to the client
        res.json(utxos);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error.message);
        // Return an error response to the client
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
