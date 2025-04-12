import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';

function List({ coin }) {
  return (
    <tr className='list-row'>
      <Tooltip title='Coin Logo'>
        <td className='td-image'>
          <Link to={`/coin/${coin?.id}`}>
            <img src={coin?.image} className='coin-logo' alt={coin?.name} />
          </Link>
        </td>
      </Tooltip>

      <Tooltip title='Coin Info'>
        <td>
          <Link to={`/coin/${coin?.id}`} className='link-flex'>
            <div className='name-col'>
              <p className='coin-symbol'>{coin?.symbol}</p>
              <p className='coin-name'>{coin?.name}</p>
            </div>
          </Link>
        </td>
      </Tooltip>

      <Tooltip title='Price Change in 24hrs' placement='bottom-start'>
        {coin?.price_change_percentage_24h > 0 ? (
          <td className='chip-flex'>
            <div className='price-chip'>
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </div>
            <div className='arrow-chip td-icon'>
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className='chip-flex'>
            <div className='price-chip chip-red'>
              {coin?.price_change_percentage_24h?.toFixed(2) ?? 'N/A'}%
            </div>
            <div className='arrow-chip chip-red td-icon'>
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
      </Tooltip>

      <Tooltip title='Current Price'>
        <td>
          <Link to={`/coin/${coin?.id}`}>
            <h3
              className='coin-price td-center-align'
              style={{
                color:
                  coin?.price_change_percentage_24h < 0
                    ? 'var(--secondary-red)'
                    : 'rgb(39, 205, 39)',
              }}
            >
              ${coin?.current_price?.toLocaleString() ?? 'N/A'}
            </h3>
          </Link>
        </td>
      </Tooltip>

      <Tooltip title='Total Volume' placement='bottom-end'>
        <td>
          <Link to={`/coin/${coin?.id}`}>
            <p className='total-volume td-right-align td-total-volume'>
              {coin?.total_volume?.toLocaleString() ?? 'N/A'}
            </p>
          </Link>
        </td>
      </Tooltip>

      <Tooltip title='Market Cap' placement='bottom-end'>
        <td className='desktop-td-mkt'>
          <Link to={`/coin/${coin?.id}`}>
            <p className='total-volume td-right-align'>
              {coin?.market_cap?.toLocaleString() ?? 'N/A'}
            </p>
          </Link>
        </td>
      </Tooltip>

      <Tooltip title='Market Cap' placement='bottom-end'>
        <td className='mobile-td-mkt'>
          <Link to={`/coin/${coin?.id}`}>
            <p className='total-volume td-right-align'>
              {coin?.market_cap ? convertNumber(coin.market_cap) : 'N/A'}
            </p>
          </Link>
        </td>
      </Tooltip>
    </tr>
  );
}

export default List;
