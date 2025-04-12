import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { coinObject } from '../functions/convertNumbers';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import PriceType from '../components/Coin/PriceType';

function Coin() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(60);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, days, priceType]);

  async function getData() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getCoinData(id);
      if (data) {
        coinObject(setCoinData, data);

        const prices = await getCoinPrices(id, days, priceType);
        if (Array.isArray(prices) && prices.length > 0) {
          settingChartData(setChartData, prices);
        } else {
          throw new Error("Invalid or empty price data");
        }
      }
    } catch (error) {
      console.error("Error in getData():", error.message);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDaysChange = (event) => {
    const newDays = Number(event.target.value);
    setDays(newDays);
  };

  const handlePriceTypeChange = (event, newType) => {
    setPriceType(newType);
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <>
          <table className="list-table">
            <tbody>
              <List coin={coinData} />
            </tbody>
          </table>

          <div className="list-table">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>

          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default Coin;
