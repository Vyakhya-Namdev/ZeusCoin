import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices) => {
  const values = prices.map((price) => price[1]);

  setChartData({
    labels: prices.map((price) => convertDate(price[0])),
    datasets: [
      {
        label: "Price (USD)",
        data: values,
        borderColor: "#F1C40F",
        backgroundColor: "#948b64",
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  });
};
