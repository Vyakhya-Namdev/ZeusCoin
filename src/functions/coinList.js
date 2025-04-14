import axios from "axios";

// Cache structure: { data: [...], timestamp: number }
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const fetchCoinList = async () => {
  const cacheKey = "coinGeckoList";
  
  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return data;
    }
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          x_cg_demo_api_key: process.env.REACT_APP_COINGECKO_API_KEY_MAIN
        }
      }
    );

    const coins = response.data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase()
    }));

    // Update cache
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: coins,
        timestamp: Date.now()
      })
    );

    return coins;
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    
    // Fallback to hardcoded list if API fails
    return [
      { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
      { id: "ethereum", name: "Ethereum", symbol: "ETH" },
      { id: "tether", name: "Tether", symbol: "USDT" },
      { id: "binancecoin", name: "BNB", symbol: "BNB" },
      { id: "solana", name: "Solana", symbol: "SOL" },
      { id: "ripple", name: "XRP", symbol: "XRP" },
      { id: "cardano", name: "Cardano", symbol: "ADA" },
      { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" }
    ];
  }
};

// For immediate use in dropdowns before API responds
export const initialCoinList = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "tether", name: "Tether", symbol: "USDT" },
  { id: "binancecoin", name: "BNB", symbol: "BNB" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "ripple", name: "XRP", symbol: "XRP" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" }
];