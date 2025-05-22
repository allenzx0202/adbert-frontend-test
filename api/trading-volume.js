import axios from "axios";

const COINS = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
];

const getLast8DaysTimestamps = () => {
  const now = new Date();
  const days = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    days.push(label);
  }
  return days;
};

const handler = async (req, res) => {
  try {
    const results = [];
    for (const coin of COINS) {
      const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`;
      const response = await axios.get(url, {
        params: {
          vs_currency: "usd",
          days: 8,
          interval: "daily",
        },
      });
      results.push({
        symbol: coin.symbol,
        volumes: response.data.total_volumes,
      });
    }

    const labels = getLast8DaysTimestamps();

    const data = labels.map((label, i) => {
      const dayData = { date: label };
      results.forEach(({ symbol, volumes }) => {
        // volumes = [[timestamp, volume], ...]
        dayData[symbol] = volumes[i] ? volumes[i][1] : null;
      });
      return dayData;
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "無法取得交易量資料" });
  }
};

export default handler;
