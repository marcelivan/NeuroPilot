import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('ritual.db');

const DDL = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS sessions(
  id INTEGER PRIMARY KEY,
  date TEXT UNIQUE,
  morning_done INTEGER DEFAULT 0,
  evening_done INTEGER DEFAULT 0,
  effort_min INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS obstacles(id INTEGER PRIMARY KEY, session_id INT, text TEXT, plan TEXT);
CREATE TABLE IF NOT EXISTS intentions(id INTEGER PRIMARY KEY, session_id INT, text TEXT);
CREATE TABLE IF NOT EXISTS truths(id INTEGER PRIMARY KEY, session_id INT, text TEXT, type TEXT);
CREATE TABLE IF NOT EXISTS gratitudes(id INTEGER PRIMARY KEY, session_id INT, text TEXT);
CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY, ts TEXT, type TEXT, meta_json TEXT);
`;

export function init() {
  db.execSync(DDL);
}

export function upsertToday(): number {
  const today = new Date().toISOString().slice(0, 10);
  db.execSync('INSERT OR IGNORE INTO sessions(date) VALUES (?);', [today]);
  const res = db.getFirstSync<{ id: number }>('SELECT id FROM sessions WHERE date=?;', [today]);
  return res?.id ?? 0;
}

export function addObstacle(sessionId: number, text: string, plan: string) {
  db.execSync('INSERT INTO obstacles(session_id,text,plan) VALUES (?,?,?);', [sessionId, text, plan]);
}

export function markStep(sessionId: number, step: 'morning' | 'evening') {
  const col = step === 'morning' ? 'morning_done' : 'evening_done';
  db.execSync(`UPDATE sessions SET ${col}=1 WHERE id=?;`, [sessionId]);
}

export function logEvent(type: string, meta: object = {}) {
  const ts = new Date().toISOString();
  db.execSync('INSERT INTO events(ts,type,meta_json) VALUES (?,?,?);', [ts, type, JSON.stringify(meta)]);
}

/*
Usage example in screen:
import { init, upsertToday, markStep, addObstacle, logEvent } from '../src/lib/db';
init(); 
const sid = upsertToday();
*/
