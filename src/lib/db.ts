import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('ritual.db');

const DDL = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY,
  date TEXT UNIQUE,
  morning_done INTEGER DEFAULT 0,
  evening_done INTEGER DEFAULT 0,
  effort_min INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS obstacles (
  id INTEGER PRIMARY KEY,
  session_id INTEGER,
  text TEXT,
  plan TEXT
);
CREATE TABLE IF NOT EXISTS intentions (id INTEGER PRIMARY KEY, session_id INTEGER, text TEXT);
CREATE TABLE IF NOT EXISTS truths (id INTEGER PRIMARY KEY, session_id INTEGER, text TEXT, type TEXT);
CREATE TABLE IF NOT EXISTS gratitudes (id INTEGER PRIMARY KEY, session_id INTEGER, text TEXT);
CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, ts TEXT, type TEXT, meta_json TEXT);
CREATE TABLE IF NOT EXISTS liked_cards (card_id INTEGER PRIMARY KEY);
`;

export function init(): void {
  db.execSync(DDL);
}

export function upsertToday(): number {
  const today = new Date().toISOString().slice(0, 10);
  db.runSync('INSERT OR IGNORE INTO sessions(date) VALUES (?);', today);
  const result = db.getFirstSync<{ id: number }>(
    'SELECT id FROM sessions WHERE date = ?;',
    today,
  );
  return result?.id ?? 0;
}

export function addObstacle(
  sessionId: number,
  text: string,
  plan: string,
): void {
  db.runSync(
    'INSERT INTO obstacles(session_id, text, plan) VALUES (?, ?, ?);',
    sessionId,
    text,
    plan,
  );
}

export function markStep(sessionId: number, step: 'morning' | 'evening'): void {
  const column = step === 'morning' ? 'morning_done' : 'evening_done';
  db.runSync(`UPDATE sessions SET ${column} = 1 WHERE id = ?;`, sessionId);
}

export function logEvent(type: string, meta: object = {}): void {
  db.runSync(
    'INSERT INTO events(ts, type, meta_json) VALUES (?, ?, ?);',
    new Date().toISOString(),
    type,
    JSON.stringify(meta),
  );
}

export function likeCard(cardId: number): void {
  db.runSync('INSERT OR IGNORE INTO liked_cards(card_id) VALUES (?);', cardId);
  logEvent('like', { card_id: cardId });
}

export function isLiked(cardId: number): boolean {
  return (
    db.getFirstSync<{ card_id: number }>(
      'SELECT card_id FROM liked_cards WHERE card_id = ?;',
      cardId,
    ) !== null
  );
}

export function shareCard(cardId: number): void {
  logEvent('share', { card_id: cardId });
}

export function ctaClick(source: string, target: string): void {
  logEvent('cta_click', { source, target });
}

export function ratePromptShown(): void {
  logEvent('rate_prompt_shown');
}

export function rateAction(): void {
  logEvent('rate_action');
}

export function deleteAll(): void {
  db.withTransactionSync(() => {
    db.runSync('DELETE FROM sessions;');
    db.runSync('DELETE FROM obstacles;');
    db.runSync('DELETE FROM intentions;');
    db.runSync('DELETE FROM truths;');
    db.runSync('DELETE FROM gratitudes;');
    db.runSync('DELETE FROM events;');
    db.runSync('DELETE FROM liked_cards;');
  });
}

export async function syncEvents(): Promise<void> {
  // Intentionally unimplemented until an authorized backend and sync contract exist.
}
