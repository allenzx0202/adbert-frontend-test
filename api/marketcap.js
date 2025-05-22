import axios from "axios";

const API_KEY = process.env.EXCHANGE_RATES_API_KEY;
const BASE_URL = "https://api.apilayer.com/exchangerates_data";

const getLast8Months = () => {
  const now = new Date();
  const months = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
    months.push({ label, dateStr });
  }

  return months;
};

const handler = async (req, res) => {
  const months = getLast8Months();
  const result = [];

  try {
    for (const { label, dateStr } of months) {
      const response = await axios.get(`${BASE_URL}/${dateStr}`, {
        params: { symbols: "BTC,XAU", base: "USD" },
        headers: {
          apikey: API_KEY,
        },
      });

      const rates = response.data.rates || {};
      result.push({
        month: label,
        BTC: 1 / (rates.BTC || 1),
        XAU: 1 / (rates.XAU || 1),
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "取得市值資料失敗" });
  }
};

export default handler;
