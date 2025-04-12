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

// Register chart components
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
        display: true,
        title: {
          display: true,
          text: 'Price (USD)',
        },
        ticks: {
          callback: function (value) {
            if (priceType === "prices") {
              return "$" + value.toLocaleString();
            } else {
              return "$" + convertNumber(value);
            }
          }
        }
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
