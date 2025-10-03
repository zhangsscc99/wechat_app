const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const DATA_DIR = process.env.WETALK_DATA_DIR || path.join(ROOT_DIR, 'data');

module.exports = {
  PORT: Number(process.env.PORT || 3001),
  DB_PATH: process.env.WETALK_DB_PATH || path.join(DATA_DIR, 'wetalk.db'),
  DATA_DIR,
  ROOT_DIR,
  SCHEMA_VERSION: 2
};
