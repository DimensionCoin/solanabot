// src/database.ts
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("solana_trading_data.db");

// Updated table schema with unique column names
db.run(`
    CREATE TABLE IF NOT EXISTS solana_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME,
        price REAL,
        bollinger_lower REAL,
        bollinger_middle REAL,
        bollinger_upper REAL,
        ema9 REAL,
        ema21 REAL,
        ema50 REAL,
        macd REAL,
        macd_signal REAL,
        rsi REAL,
        bollinger_signal INTEGER,
        macd_histogram_signal INTEGER,
        rsi_signal INTEGER
    )
`);

export function insertData(data: {
  timestamp: string;
  price: number;
  bollinger_lower: number | null;
  bollinger_middle: number | null;
  bollinger_upper: number | null;
  ema9: number | null;
  ema21: number | null;
  ema50: number | null;
  macd: number | null;
  macd_signal: number | null;
  rsi: number | null;
  bollinger_signal: number | null;
  macd_histogram_signal: number | null; // Renamed here
  rsi_signal: number | null;
}) {
  const query = `
        INSERT INTO solana_data (timestamp, price, bollinger_lower, bollinger_middle, bollinger_upper, ema9, ema21, ema50, macd, macd_signal, rsi, bollinger_signal, macd_histogram_signal, rsi_signal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  db.run(query, [
    data.timestamp,
    data.price,
    data.bollinger_lower,
    data.bollinger_middle,
    data.bollinger_upper,
    data.ema9,
    data.ema21,
    data.ema50,
    data.macd,
    data.macd_signal,
    data.rsi,
    data.bollinger_signal,
    data.macd_histogram_signal, // Updated here
    data.rsi_signal,
  ]);
}

export function getRecentData(limit: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM solana_data ORDER BY timestamp DESC LIMIT ?`,
      [limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
