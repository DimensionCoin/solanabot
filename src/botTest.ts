import { getRecentData } from "./database";

async function monitorBot() {
  let inPosition = false;

  while (!inPosition) {
    // Fetch the latest data from each timeframe table
    const oneSecData = await getRecentData(1, "solana_data");
    const oneMinData = await getRecentData(1, "solana_data_1min");
    const fiveMinData = await getRecentData(1, "solana_data_5min");
    const fifteenMinData = await getRecentData(1, "solana_data_15min");

    const latest1Sec = oneSecData[0];
    const latest1Min = oneMinData[0];
    const latest5Min = fiveMinData[0];
    const latest15Min = fifteenMinData[0];

    if (!latest1Sec || !latest1Min || !latest5Min || !latest15Min) {
      console.log("Insufficient data for decision-making. Monitoring...");
    } else {
      // Check for a potential long position
      const longCondition =
        latest1Sec.macd_signal === 1 &&
        latest1Min.macd_signal === 1 &&
        latest5Min.macd_signal === 1 &&
        latest15Min.macd_signal === 1 &&
        latest1Sec.price > latest1Sec.bollinger_middle &&
        (latest1Sec.rsi < 30 ||
          latest1Min.rsi < 30 ||
          latest5Min.rsi < 30 ||
          latest15Min.rsi < 30);

      // Check for a potential short position
      const shortCondition =
        latest1Sec.macd_signal === -1 &&
        latest1Min.macd_signal === -1 &&
        latest5Min.macd_signal === -1 &&
        latest15Min.macd_signal === -1 &&
        latest1Sec.price < latest1Sec.bollinger_middle &&
        (latest1Sec.rsi > 70 ||
          latest1Min.rsi > 70 ||
          latest5Min.rsi > 70 ||
          latest15Min.rsi > 70);

      if (longCondition) {
        console.log(
          "Executing Long Trade based on multi-timeframe confirmation."
        );
        executeTrade("long", latest1Sec.price);
        inPosition = true;
      } else if (shortCondition) {
        console.log(
          "Executing Short Trade based on multi-timeframe confirmation."
        );
        executeTrade("short", latest1Sec.price);
        inPosition = true;
      } else {
        console.log("No trade conditions met. Monitoring...");
        console.log("Summary:");
        console.log(
          `MACD Signals - 1s: ${latest1Sec.macd_signal}, 1m: ${latest1Min.macd_signal}, 5m: ${latest5Min.macd_signal}, 15m: ${latest15Min.macd_signal}`
        );
        console.log(
          `Price vs Bollinger Middle - 1s: ${
            latest1Sec.price > latest1Sec.bollinger_middle ? "Above" : "Below"
          }`
        );
        console.log(
          `RSI Levels - 1s: ${latest1Sec.rsi}, 1m: ${latest1Min.rsi}, 5m: ${latest5Min.rsi}, 15m: ${latest15Min.rsi}`
        );
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Check every 3 seconds
  }
}

// Simulate executing a trade
function executeTrade(positionType: "long" | "short", entryPrice: number) {
  console.log(`\n--- Trade Summary ---`);
  console.log(`Position Type: ${positionType.toUpperCase()}`);
  console.log(`Entry Price: $${entryPrice.toFixed(3)}`);
  console.log(`Executing ${positionType} trade...\n`);
  console.log(`Trade executed successfully.`);
}

monitorBot();
