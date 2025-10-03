const db = require('../../database/connection');

const discoverStmt = db.prepare('SELECT * FROM discover_items ORDER BY rowid');

function findAll() {
  return discoverStmt.all().map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    icon: row.icon,
    badge: row.badge
  }));
}

module.exports = {
  findAll
};
