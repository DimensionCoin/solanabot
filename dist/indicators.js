"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIndicators = calculateIndicators;
// src/indicators.ts
const technicalindicators_1 = require("technicalindicators");
function calculateIndicators(prices) {
    const bollinger = technicalindicators_1.BollingerBands.calculate({ period: 20, stdDev: 2, values: prices }).slice(-1)[0] || {};
    const macdValues = technicalindicators_1.MACD.calculate({
        values: prices,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
    }).slice(-1)[0] || {};
    const rsiValue = technicalindicators_1.RSI.calculate({ period: 14, values: prices }).slice(-1)[0] || null;
    return {
        bollinger_lower: bollinger.lower || null,
        bollinger_middle: bollinger.middle || null,
        bollinger_upper: bollinger.upper || null,
        macd: macdValues.MACD || null,
        macd_signal: macdValues.signal || null,
        rsi: rsiValue,
    };
}
