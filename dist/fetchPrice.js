"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamSolanaPrice = streamSolanaPrice;
// src/fetchPrice.ts
const price_service_client_1 = require("@pythnetwork/price-service-client");
const calcIndicators_1 = require("./calcIndicators");
const connection = new price_service_client_1.PriceServiceConnection("https://hermes.pyth.network");
const solanaPriceId = "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";
function streamSolanaPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            connection.subscribePriceFeedUpdates([solanaPriceId], (priceFeed) => {
                const currentPrice = priceFeed.getPriceNoOlderThan(60);
                if (currentPrice) {
                    const price = parseFloat(currentPrice.price) * Math.pow(10, currentPrice.expo);
                    const timestamp = new Date().toISOString();
                    console.log(`[${timestamp}] Solana Price: $${price.toFixed(3)}`);
                    // Send the price to calculate indicators
                    (0, calcIndicators_1.updateIndicators)(price, timestamp);
                }
            });
        }
        catch (error) {
            console.error("Error streaming Solana price:", error);
        }
    });
}
