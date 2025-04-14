import axios from "axios";

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
};