import React from 'react';
import { convertNumber } from '../../../functions/convertNumber';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ chartData, priceType }) {
  // Dynamic y-axis title based on priceType
  const getYAxisTitle = (type) => {
    switch (type) {
      case 'prices':
        return 'Price (USD)';
      case 'market_caps':
        return 'Market Cap (USD)';
      case 'total_volumes':
        return 'Total Volume (USD)';
      default:
        return 'Value (USD)';
    }
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: getYAxisTitle(priceType),
        },
        ticks: {
          callback: function (value) {
            if (priceType === "prices" || priceType === "market_caps") {
              return "$" + value.toLocaleString();
            } else if (priceType === "total_volumes") {
              return value.toLocaleString(); 
            } else {
              return "$" + convertNumber(value);
            }
          }
        }
      },
    },
  };

  if (chartData?.datasets?.length === 2) {
    options.scales.y1 = {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: getYAxisTitle(priceType),
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        callback: function (value) {
          if (priceType === "prices" || priceType === "market_caps") {
            return "$" + value.toLocaleString();
          } else if (priceType === "total_volumes") {
            return value.toLocaleString(); 
          } else {
            return "$" + convertNumber(value);
          }
        }
      }
    };

    chartData.datasets[0].yAxisID = 'y';
    chartData.datasets[1].yAxisID = 'y1';
  } else {
    if (chartData?.datasets?.length === 1) {
      chartData.datasets[0].yAxisID = 'y';
    }
  }

  return <Line data={chartData} options={options} />;
}

export default LineChart;
