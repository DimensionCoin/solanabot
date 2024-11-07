import { streamSolanaPrice } from "./fetchPrice";
import "./aggregation"; // This will automatically start the aggregation intervals

console.log("Starting Solana price stream and indicator calculation...");

// Start streaming Solana price and calculating indicators
streamSolanaPrice();
