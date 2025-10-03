const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const { DB_PATH, DATA_DIR } = require('../config/env');

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

const journalMode = db.pragma('journal_mode = WAL', { simple: true });

// eslint-disable-next-line no-console
console.log(`SQLite connected at ${path.relative(process.cwd(), DB_PATH)} (journal_mode=${journalMode})`);

module.exports = db;
