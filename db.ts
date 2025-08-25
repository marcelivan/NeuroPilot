import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('appdb.db');

export function logEvent(type: string, meta: object = {}) {
  db.execSync?.('INSERT INTO events (ts, type, meta_json) VALUES (?, ?, ?);', [
    new Date().toISOString(),
    type,
    JSON.stringify(meta)
  ]);
}

// Usage Examples:
export function likeCard(cardId: number) {
  // existing logic to update likes table...
  logEvent('like', { card_id: cardId });
}

export function shareCard(cardId: number) {
  logEvent('share', { card_id: cardId });
}

export function ctaClick(source: string, target: string) {
  logEvent('cta_click', { source, target });
}

export function ratePromptShown() {
  logEvent('rate_prompt_shown', {});
}

export function rateAction() {
  logEvent('rate_action', {});
}

export async function syncEvents() {
  // SELECT all unsynced events and POST to your backend
  // mark as synced in local db afterward
}
