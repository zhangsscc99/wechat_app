const db = require('../../database/connection');

const momentsStmt = db.prepare('SELECT * FROM moments ORDER BY datetime(created_at) DESC');
const mediaStmt = db.prepare('SELECT url FROM moment_media WHERE moment_id = ? ORDER BY id');
const repliesStmt = db.prepare(
  'SELECT id, author, text FROM moment_replies WHERE moment_id = ? ORDER BY rowid'
);

function findAll() {
  const rows = momentsStmt.all();

  return rows.map((row) => ({
    id: row.id,
    author: {
      name: row.author_name,
      avatar: row.author_avatar
    },
    content: row.content,
    createdAt: row.created_at,
    media: mediaStmt.all(row.id).map((item) => item.url),
    replies: repliesStmt.all(row.id)
  }));
}

module.exports = {
  findAll
};
