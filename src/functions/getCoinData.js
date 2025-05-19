/*import axios from "axios";

const coinGeckoDataAPI = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
  params: {
    x_cg_demo_api_key: process.env.REACT_APP_COINGECKO_API_KEY_DATA
  },
  timeout: 10000 
});

export const getCoinData = async (id) => {
  try {
    const cacheKey = `coin-${id}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await coinGeckoDataAPI.get(`/coins/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    });
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Data Error:", error.message);
    
    // Fallback to basic data if available
    const basicData = localStorage.getItem(`coin-basic-${id}`);
    return basicData ? JSON.parse(basicData) : null;
  }
};*/

import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka base URL sahi rakho
  timeout: 10000,
});

export const getCoinData = async (id) => {
  try {
    const cacheKey = `coin-${id}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Backend API call karo
    const response = await backendAPI.get(`/coins/${id}`); // add coin id here

    sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Data Error:", error.message);
    throw error; // component me handle karna
  }
};
