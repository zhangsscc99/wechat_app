const db = require('../../database/connection');

const shortcutStmt = db.prepare('SELECT * FROM contact_shortcuts ORDER BY rowid');
const contactsStmt = db.prepare(
  'SELECT * FROM contacts ORDER BY letter COLLATE NOCASE ASC, name COLLATE NOCASE ASC'
);

function findAll() {
  const shortcuts = shortcutStmt.all().map((row) => ({
    id: row.id,
    icon: row.icon,
    label: row.label,
    note: row.note || null
  }));

  const contacts = contactsStmt.all();
  const grouped = new Map();

  for (const contact of contacts) {
    if (!grouped.has(contact.letter)) {
      grouped.set(contact.letter, []);
    }
    grouped.get(contact.letter).push({
      id: contact.id,
      name: contact.name,
      avatar: contact.avatar,
      status: contact.status
    });
  }

  const sections = Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, list]) => ({ letter, contacts: list }));

  return { shortcuts, sections };
}

module.exports = {
  findAll
};
