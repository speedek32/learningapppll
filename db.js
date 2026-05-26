const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'passplus.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    username     TEXT UNIQUE NOT NULL,
    email        TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_premium   INTEGER DEFAULT 0,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_stats (
    user_id       INTEGER PRIMARY KEY,
    xp            INTEGER DEFAULT 0,
    streak        INTEGER DEFAULT 0,
    last_activity TEXT    DEFAULT '',
    total_tests   INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS results (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    category   TEXT,
    score      INTEGER,
    total      INTEGER,
    pass_score INTEGER DEFAULT 50,
    passed     INTEGER DEFAULT 0,
    date       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;
