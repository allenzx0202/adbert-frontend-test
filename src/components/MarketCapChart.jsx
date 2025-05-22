import useSWR from "swr";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const MarketCapChart = () => {
  const { data, error, isLoading } = useSWR("/api/marketcap", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed</p>;

  const months = data.map((d) => d.month);
  const btc = data.map((d) => d.BTC);
  const xau = data.map((d) => d.XAU);

  return (
    <BarChart
      xAxis={[{ data: months, scaleType: "band" }]}
      series={[
        { label: "BTC", data: btc, stack: "price", color: "#f7931a" },
        { label: "XAU", data: xau, stack: "price", color: "#627eea" },
      ]}
      height={400}
      stacking="normal"
    />
  );
};

export default MarketCapChart;
