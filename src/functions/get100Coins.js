import axios from "axios";

export const get100Coins = () => {
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
      return []; 
    });
};
