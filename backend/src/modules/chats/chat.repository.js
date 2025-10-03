const { randomUUID } = require('crypto');
const dayjs = require('dayjs');
const db = require('../../database/connection');

const mapChatRow = (row) => ({
  id: row.id,
  name: row.name,
  avatar: row.avatar,
  subtitle: row.subtitle,
  updatedAt: row.updated_at,
  unreadCount: row.unread_count,
  muted: Boolean(row.muted),
  pinned: Boolean(row.pinned),
  type: row.type,
  participants: row.participants ? JSON.parse(row.participants) : []
});

const mapMessageRow = (row) => ({
  id: row.id,
  chatId: row.chat_id,
  sender: row.sender,
  senderId: row.sender_id,
  text: row.text,
  timestamp: row.timestamp
});

const selectAllChatsStmt = db.prepare(
  'SELECT * FROM chats ORDER BY pinned DESC, datetime(updated_at) DESC'
);

const selectChatStmt = db.prepare('SELECT * FROM chats WHERE id = ?');

const selectMessagesStmt = db.prepare(
  'SELECT * FROM messages WHERE chat_id = ? ORDER BY datetime(timestamp) ASC'
);

const selectLastMessageStmt = db.prepare(
  'SELECT * FROM messages WHERE chat_id = ? ORDER BY datetime(timestamp) DESC LIMIT 1'
);

const insertMessageStmt = db.prepare(
  'INSERT INTO messages (id, chat_id, sender, sender_id, text, timestamp) VALUES (@id, @chatId, @sender, @senderId, @text, @timestamp)'
);

const updateChatStmt = db.prepare(
  'UPDATE chats SET subtitle = ?, updated_at = ?, unread_count = 0 WHERE id = ?'
);

function findAll() {
  const rows = selectAllChatsStmt.all();
  return rows.map((row) => {
    const chat = mapChatRow(row);
    const lastRow = selectLastMessageStmt.get(chat.id);
    chat.lastMessage = lastRow ? mapMessageRow(lastRow) : null;
    return chat;
  });
}

function findById(chatId) {
  const row = selectChatStmt.get(chatId);
  return row ? mapChatRow(row) : null;
}

function findMessages(chatId) {
  return selectMessagesStmt.all(chatId).map(mapMessageRow);
}

function saveMessage(chatId, { sender, senderId, text }) {
  const timestamp = dayjs().toISOString();
  const message = {
    id: `msg-${Date.now().toString(36)}-${randomUUID().slice(0, 8)}`,
    chatId,
    sender,
    senderId,
    text,
    timestamp
  };

  db.transaction(() => {
    insertMessageStmt.run(message);
    updateChatStmt.run(message.text, message.timestamp, chatId);
  })();

  return message;
}

module.exports = {
  findAll,
  findById,
  findMessages,
  saveMessage
};
