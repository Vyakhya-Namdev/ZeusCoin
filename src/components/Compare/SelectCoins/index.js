import React, { useEffect, useState } from 'react';
import { get100Coins } from '../../../functions/get100Coins';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './styles.css';

function SelectCoins({crypto1, crypto2, handleCoinChange}) {  
  const [allCoins, setAllCoins] = useState([]);

  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  useEffect(() => {
    getCoinData();
  }, []);

  async function getCoinData() {
    const myCoins = await get100Coins();
    setAllCoins(myCoins);
  }

  return (
    <div className='coin-flex'>
      {allCoins.length > 0 && (
        <>
          <p>Crypto1</p>
          <Select
            sx={styles}
            value={crypto1}
            label="Crypto 1"
            onChange={(event) => handleCoinChange(event, false)}
          >
            {allCoins.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
  
          <p>Crypto2</p>
          <Select
            sx={styles}
            value={crypto2}
            label="Crypto 2"
            onChange={(event) => handleCoinChange(event, true)}
          >
            {allCoins.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </div>
  );
  
}

export default SelectCoins;
