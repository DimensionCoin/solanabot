"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchPrice_1 = require("./fetchPrice");
require("./aggregation"); // This will automatically start the aggregation intervals
console.log("Starting Solana price stream and indicator calculation...");
// Start streaming Solana price and calculating indicators
(0, fetchPrice_1.streamSolanaPrice)();
