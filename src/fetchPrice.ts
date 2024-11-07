// src/fetchPrice.ts
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { updateIndicators } from "./calcIndicators";

const connection = new PriceServiceConnection("https://hermes.pyth.network");
const solanaPriceId =
  "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";

export async function streamSolanaPrice() {
  try {
    connection.subscribePriceFeedUpdates([solanaPriceId], (priceFeed) => {
      const currentPrice = priceFeed.getPriceNoOlderThan(60);

      if (currentPrice) {
        const price =
          parseFloat(currentPrice.price) * Math.pow(10, currentPrice.expo);
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] Solana Price: $${price.toFixed(3)}`);

        // Send the price to calculate indicators
        updateIndicators(price, timestamp);
      }
    });
  } catch (error) {
    console.error("Error streaming Solana price:", error);
  }
}
