"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const fetchPrice_1 = require("./fetchPrice");
console.log("Starting Solana price stream and indicator calculation...");
(0, fetchPrice_1.streamSolanaPrice)();
