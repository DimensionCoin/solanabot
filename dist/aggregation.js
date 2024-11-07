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
// src/aggregation.ts
const database_1 = require("./database");
const indicators_1 = require("./indicators");
function aggregateData(intervalSeconds, tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const recentData = yield (0, database_1.getRecentData)(intervalSeconds, "solana_data");
        const prices = recentData.map((data) => data.price);
        const timestamp = new Date().toISOString();
        // Calculate indicators for the aggregated interval
        const indicators = (0, indicators_1.calculateIndicators)(prices);
        const data = Object.assign({ timestamp, price: prices[prices.length - 1] }, indicators);
        // Specify the correct table for each timeframe
        (0, database_1.insertData)(tableName, data);
    });
}
// Schedule aggregations
setInterval(() => aggregateData(60, "solana_data_1min"), 60000); // 1-minute
setInterval(() => aggregateData(300, "solana_data_5min"), 300000); // 5-minute
setInterval(() => aggregateData(900, "solana_data_15min"), 900000); // 15-minute
