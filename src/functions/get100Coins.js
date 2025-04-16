import axios from "axios";

const coinGeckoMainAPI = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  params: {
    x_cg_demo_api_key: process.env.REACT_APP_COINGECKO_API_KEY_MAIN
  },
  timeout: 5000
});

export const get100Coins = async () => {
  try {
    const response = await coinGeckoMainAPI.get("/coins/markets", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error("Main API Error:", error.message);
    throw error;
  }
};