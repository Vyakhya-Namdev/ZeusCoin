/*import axios from "axios";

const coinGeckoChartAPI = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  params: {
    x_cg_demo_api_key: process.env.REACT_APP_COINGECKO_API_KEY_CHART
  },
  timeout: 10000 
});

export const getCoinPrices = async (id, days, priceType) => {
  try {
    const cacheKey = `prices-${id}-${days}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData)[priceType];
    }

    const response = await coinGeckoChartAPI.get(`/coins/${id}/market_chart`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      params: {
        vs_currency: "usd",
        days,
        interval: "daily"
      }
    });

    sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data[priceType];
  } catch (error) {
    console.error("Chart Error:", error.message);
    throw error; // Re-throw for component-level handling
  }
};*/

// Ab axios baseURL backend ka kar do
import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  timeout: 10000,
});

export const getCoinPrices = async (id, days, priceType) => {
  try {
    const cacheKey = `prices-${id}-${days}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData)[priceType];
    }

    // Backend ke proxy route ko call kar rahe hain
    const response = await backendAPI.get(`/coins/${id}/market_chart`, {
      params: { days }
    });

    sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data[priceType];
  } catch (error) {
    console.error("Chart Error:", error.message);
    throw error;
  }
};
