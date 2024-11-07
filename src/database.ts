// src/database.ts
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("solana_trading_data.db");

// Base table for storing real-time (1-second) data
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

// 1-minute aggregated data table
db.run(`
  CREATE TABLE IF NOT EXISTS solana_data_1min (
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

// 5-minute aggregated data table
db.run(`
  CREATE TABLE IF NOT EXISTS solana_data_5min (
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

// 15-minute aggregated data table
db.run(`
  CREATE TABLE IF NOT EXISTS solana_data_15min (
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

export function insertData(table: string, data: any) {
  const query = `
    INSERT INTO ${table} (timestamp, price, bollinger_lower, bollinger_middle, bollinger_upper, ema9, ema21, ema50, macd, macd_signal, rsi, bollinger_signal, macd_histogram_signal, rsi_signal)
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
    data.macd_histogram_signal,
    data.rsi_signal,
  ]);
}

export function getRecentData(limit: number, table: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM ${table} ORDER BY timestamp DESC LIMIT ?`,
      [limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
