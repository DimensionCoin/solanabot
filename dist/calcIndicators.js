"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIndicators = updateIndicators;
// src/calcIndicators.ts
const technicalindicators_1 = require("technicalindicators");
const database_1 = require("./database");
const prices = [];
function updateIndicators(price, timestamp) {
    prices.push(price);
    if (prices.length >= 20) {
        const bollinger = technicalindicators_1.BollingerBands.calculate({ period: 20, stdDev: 2, values: prices }).slice(-1)[0] || {};
        const ema9 = technicalindicators_1.EMA.calculate({ period: 9, values: prices }).slice(-1)[0] || null;
        const ema21 = technicalindicators_1.EMA.calculate({ period: 21, values: prices }).slice(-1)[0] || null;
        const ema50 = technicalindicators_1.EMA.calculate({ period: 50, values: prices }).slice(-1)[0] || null;
        const macdValues = technicalindicators_1.MACD.calculate({
            values: prices,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false,
        }).slice(-1)[0] || {};
        const rsiValue = technicalindicators_1.RSI.calculate({ period: 14, values: prices }).slice(-1)[0] || null;
        // Safely retrieve Bollinger bands and check MACD and RSI for undefined/null values
        const bollinger_signal = price > (bollinger.upper || 0)
            ? 1
            : price < (bollinger.lower || 0)
                ? -1
                : 0;
        const macd_histogram_signal = macdValues.MACD && macdValues.signal
            ? macdValues.MACD > macdValues.signal
                ? 1
                : macdValues.MACD < macdValues.signal
                    ? -1
                    : 0
            : 0;
        const rsi_signal = rsiValue !== null && rsiValue < 30
            ? 1
            : rsiValue !== null && rsiValue > 70
                ? -1
                : 0;
        const data = {
            timestamp,
            price,
            bollinger_lower: bollinger.lower || null,
            bollinger_middle: bollinger.middle || null,
            bollinger_upper: bollinger.upper || null,
            ema9,
            ema21,
            ema50,
            macd: macdValues.MACD || null,
            macd_signal: macdValues.signal || null,
            rsi: rsiValue,
            bollinger_signal,
            macd_histogram_signal, // Updated here
            rsi_signal,
        };
        (0, database_1.insertData)(data);
    }
}
