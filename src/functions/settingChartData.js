import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2 = null) => {
  if (prices2) {
    setChartData({
      labels: prices1?.map((data) => convertDate(data[0])),
      datasets: [
        {
          label: "Crypto 1",
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          borderColor: "#F1C40F", // Yellow for Crypto 1
          pointRadius: 0,
          yAxisID: "crypto1",
        },
        {
          label: "Crypto 2",
          data: prices2?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          borderColor: "#61c96f", // Green for Crypto 2
          pointRadius: 0,
          yAxisID: "crypto2",
        },
      ],
    });
  } else {
    setChartData({
      labels: prices1?.map((data) => convertDate(data[0])),
      datasets: [
        {
          label: "Price (USD)",
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: true,
          backgroundColor: "#ecd26c", // Background color (yellow) for single crypto
          tension: 0.25,
          borderColor: "var(--secondary-yellow)", // Yellow border for single crypto
          pointRadius: 0,
          yAxisID: "crypto1",
        },
      ],
    });
  }
};
