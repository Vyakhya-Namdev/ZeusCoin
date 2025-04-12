import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { coinObject } from '../functions/convertNumbers';
import List from '../components/Dashboard/List'; 

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

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleCoinChange = async (event, isCoin2) => {
    const coin = event.target.value;
    setIsLoading(true);

    if (isCoin2) {
      setCrypto2(coin);
      const data = await getCoinData(coin);
      coinObject(setCrypto2Data, data);
    } else {
      setCrypto1(coin);
      const data = await getCoinData(coin);
      coinObject(setCrypto1Data, data);
    }
  };

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]);

  const getData = async () => {
    setIsLoading(true);

    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);

    if (!data1 || !data2) {
      console.error("Failed to fetch coin data");
      setIsLoading(false);
      return;
    }

    setCrypto1Data(data1);
    setCrypto2Data(data2);

    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);

    if (Array.isArray(prices1) && prices1.length > 0 && Array.isArray(prices2) && prices2.length > 0) {
      setCrypto1Prices(prices1);
      setCrypto2Prices(prices2);
    } else {
      console.error("Invalid or empty price data");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <div className='coins-days-flex'>
        <SelectCoins
          crypto1={crypto1}
          crypto2={crypto2}
          handleCoinChange={handleCoinChange}
        />
        <SelectDays
          days={days}
          handleDaysChange={handleDaysChange}
          noPTag={true}
        />
      </div>

      <table className="list-table">
        <tbody>
          <List coin={crypto1Data}/>
        </tbody>
      </table>

      <table className="list-table">
        <tbody>
          <List coin={crypto2Data} /> 
        </tbody>
      </table>

      <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
      <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
    </div>
  );
}

export default ComparePage;
