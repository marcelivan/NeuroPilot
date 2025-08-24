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

CREATE TABLE IF NOT EXISTS intentions (
  id INTEGER PRIMARY KEY,
  session_id INTEGER,
  text TEXT
);

CREATE TABLE IF NOT EXISTS truths (
  id INTEGER PRIMARY KEY,
  session_id INTEGER,
  text TEXT,
  type TEXT CHECK(type IN ('shadow','lesson'))
);

CREATE TABLE IF NOT EXISTS gratitudes (
  id INTEGER PRIMARY KEY,
  session_id INTEGER,
  text TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  ts TEXT,
  type TEXT,
  meta_json TEXT
);
