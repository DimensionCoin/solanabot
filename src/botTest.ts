// src/botTest.ts
import { getRecentData } from "./database";

async function fetchBotData() {
  const data = await getRecentData(20); // Fetch the last 20 data points
  console.log("Bot Data:", data);

  const latest = data[0];

  // Simple buy/sell decision based on signals
  if (latest.bollinger_signal === 1 && latest.macd_signal === 1) {
    console.log(
      "Buy signal: Price is above Bollinger band and MACD is bullish."
    );
  } else if (latest.rsi_signal === -1 && latest.macd_signal === -1) {
    console.log("Sell signal: RSI is overbought and MACD is bearish.");
  } else {
    console.log("No strong buy/sell signal.");
  }
}

fetchBotData();
