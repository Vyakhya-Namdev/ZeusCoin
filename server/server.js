require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Simple test route
app.get('/api/data', (req, res) => {
  res.json({ message: 'CORS is enabled!' });
});

// Market chart route
app.get('/api/coins/:id/market_chart', async (req, res) => {
  const { id } = req.params;
  const { days } = req.query;

  try {
    console.log('Env variable for chart:', process.env.REACT_APP_COINGECKO_API_KEY_CHART);
    const template = process.env.REACT_APP_COINGECKO_API_KEY_CHART;
    if (!template) {
      return res.status(500).json({ message: "API URL for market chart not configured in env" });
    }
    const apiUrl = template.replace("{id}", id).replace("{days}", days || '1');
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error.message);
    res.status(500).json({ message: 'Error fetching coin data' });
  }
});

// Coin data route

app.get('/api/coins/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Env variable for coin data:', process.env.REACT_APP_COINGECKO_API_KEY_DATA);
    const template = process.env.REACT_APP_COINGECKO_API_KEY_DATA;
    if (!template) {
      return res.status(500).json({ message: "API URL for coin data not configured in env" });
    }

    const apiUrl = template.replace("{id}", id);
    console.log('Final Coin Data API URL:', apiUrl);

    const response = await axios.get(apiUrl);
    res.json(response.data);

  } catch (error) {
    console.error("Error fetching coin data:", error.message);
    res.status(500).json({ message: 'Error fetching coin data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
