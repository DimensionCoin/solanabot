// src/index.ts
import { streamSolanaPrice } from "./fetchPrice";

console.log("Starting Solana price stream and indicator calculation...");
streamSolanaPrice();
