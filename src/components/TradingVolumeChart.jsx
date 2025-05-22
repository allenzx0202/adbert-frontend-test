import useSWR from "swr";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TradingVolumeChart = () => {
  const { data, error, isLoading } = useSWR("/api/trading-volume", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed</p>;

  const dates = data.map((d) => d.date);
  const btc = data.map((d) => d.BTC);
  const eth = data.map((d) => d.ETH);

  return (
    <BarChart
      xAxis={[{ data: dates, scaleType: "band" }]}
      series={[
        {
          label: "BTC Volume",
          data: btc,
          color: "#f7931a",
          stack: "volume",
        },
        {
          label: "ETH Volume",
          data: eth,
          color: "#627eea",
          stack: "volume",
        },
      ]}
      height={400}
      stacking="normal"
    />
  );
};

export default TradingVolumeChart;
