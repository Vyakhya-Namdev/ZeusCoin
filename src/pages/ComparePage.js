import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import List from "../components/Dashboard/List";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart"; // Importing the chart component

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [crypto1Prices, setCrypto1Prices] = useState([]);
  const [crypto2Prices, setCrypto2Prices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleCoinChange = async (event, isCoin2) => {
    const coin = event.target.value;
    setIsLoading(true);

    try {
      const data = await getCoinData(coin);
      const formattedData = formatCoinData(data);

      if (isCoin2) {
        setCrypto2(coin);
        setCrypto2Data(formattedData);
        fetchData();
      } else {
        setCrypto1(coin);
        setCrypto1Data(formattedData);
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCoinData = (data) => ({
    name: data.name,
    symbol: data.symbol?.toUpperCase(),
    image: data.image?.large,
    current_price: data.market_data?.current_price?.usd,
    price_change_percentage_24h: data.market_data?.price_change_percentage_24h,
    market_cap: data.market_data?.market_cap?.usd,
    total_volume: data.market_data?.total_volume?.usd,
    desc: data.description?.en || "No description available.",
  });

  useEffect(() => {
    fetchData();
  }, [crypto1, crypto2, days, priceType]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [data1, data2, prices1, prices2] = await Promise.all([
        getCoinData(crypto1),
        getCoinData(crypto2),
        getCoinPrices(crypto1, days, priceType),
        getCoinPrices(crypto2, days, priceType),
      ]);

      setCrypto1Data(formatCoinData(data1));
      setCrypto2Data(formatCoinData(data2));
      settingChartData(setChartData, prices1, prices2);

      if (Array.isArray(prices1) && prices1.length > 0) {
        setCrypto1Prices(prices1);
      }
      if (Array.isArray(prices2) && prices2.length > 0) {
        setCrypto2Prices(prices2);
      }
    } catch (error) {
      console.error("Error in comparison data fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="coins-days-flex">
        <SelectCoins
          crypto1={crypto1}
          crypto2={crypto2}
          handleCoinChange={handleCoinChange}
          disabled={isLoading}
        />
        <SelectDays
          days={days}
          handleDaysChange={handleDaysChange}
          noPTag={true}
          disabled={isLoading}
        />
      </div>

      {isLoading ? (
        <div className="loading-indicator">Loading comparison data...</div>
      ) : (
        <>
          <div className="comparison-section">
            <table className="list-table">
              <tbody>
                <List coin={crypto1Data} />
              </tbody>
            </table>
          </div>

          <div className="comparison-section">
            <table className="list-table">
              <tbody>
                <List coin={crypto2Data} />
              </tbody>
            </table>
          </div>

          {/* Chart rendering */}
          {!isLoading && chartData && chartData.datasets && (
            <div className="chart-wrapper">
              <LineChart chartData={chartData} />
            </div>
          )}
        </>
      )}

      <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
      <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
    </div>
  );
}

export default ComparePage;