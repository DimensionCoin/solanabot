// src/aggregation.ts
import { getRecentData, insertData } from "./database";
import { calculateIndicators } from "./indicators";

async function aggregateData(intervalSeconds: number, tableName: string) {
  const recentData = await getRecentData(intervalSeconds, "solana_data");

  const prices = recentData.map((data) => data.price);
  const timestamp = new Date().toISOString();

  // Calculate indicators for the aggregated interval
  const indicators = calculateIndicators(prices);

  const data = {
    timestamp,
    price: prices[prices.length - 1], // Latest price for the interval
    ...indicators,
  };

  // Specify the correct table for each timeframe
  insertData(tableName, data);
}

// Schedule aggregations
setInterval(() => aggregateData(60, "solana_data_1min"), 60000); // 1-minute
setInterval(() => aggregateData(300, "solana_data_5min"), 300000); // 5-minute
setInterval(() => aggregateData(900, "solana_data_15min"), 900000); // 15-minute
