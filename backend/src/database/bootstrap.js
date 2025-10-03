const path = require('path');
const db = require('./connection');
const { chats, chatMessages, contactShortcuts, contactSections, discoverItems, profile, moments } = require('./seed/data');
const { SCHEMA_VERSION } = require('../config/env');

const boolToInt = (value) => (value ? 1 : 0);

function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      avatar TEXT,
      subtitle TEXT,
      updated_at TEXT,
      unread_count INTEGER DEFAULT 0,
      muted INTEGER DEFAULT 0,
      pinned INTEGER DEFAULT 0,
      type TEXT,
      participants TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contact_shortcuts (
      id TEXT PRIMARY KEY,
      icon TEXT,
      label TEXT,
      note TEXT
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      letter TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS discover_items (
      id TEXT PRIMARY KEY,
      title TEXT,
      subtitle TEXT,
      icon TEXT,
      badge INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      avatar TEXT,
      cover TEXT,
      wechat_id TEXT,
      tagline TEXT
    );

    CREATE TABLE IF NOT EXISTS profile_actions (
      id TEXT PRIMARY KEY,
      profile_id TEXT NOT NULL,
      label TEXT,
      extra TEXT,
      FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS profile_sections (
      id TEXT PRIMARY KEY,
      profile_id TEXT NOT NULL,
      title TEXT,
      icon TEXT,
      navigation INTEGER DEFAULT 0,
      FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS moments (
      id TEXT PRIMARY KEY,
      author_name TEXT,
      author_avatar TEXT,
      content TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS moment_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      moment_id TEXT NOT NULL,
      url TEXT NOT NULL,
      FOREIGN KEY (moment_id) REFERENCES moments(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS moment_replies (
      id TEXT PRIMARY KEY,
      moment_id TEXT NOT NULL,
      author TEXT,
      text TEXT,
      FOREIGN KEY (moment_id) REFERENCES moments(id) ON DELETE CASCADE
    );
  `);
}

function resetTables() {
  db.exec(`
    DELETE FROM messages;
    DELETE FROM chats;
    DELETE FROM contact_shortcuts;
    DELETE FROM contacts;
    DELETE FROM discover_items;
    DELETE FROM profile_actions;
    DELETE FROM profile_sections;
    DELETE FROM profiles;
    DELETE FROM moment_media;
    DELETE FROM moment_replies;
    DELETE FROM moments;
  `);
}

function seedChats() {
  const insertChat = db.prepare(`
    INSERT INTO chats (id, name, avatar, subtitle, updated_at, unread_count, muted, pinned, type, participants)
    VALUES (@id, @name, @avatar, @subtitle, @updatedAt, @unreadCount, @muted, @pinned, @type, @participants)
  `);

  const insertMessage = db.prepare(`
    INSERT INTO messages (id, chat_id, sender, sender_id, text, timestamp)
    VALUES (@id, @chatId, @sender, @senderId, @text, @timestamp)
  `);

  for (const chat of chats) {
    insertChat.run({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar,
      subtitle: chat.subtitle,
      updatedAt: chat.updatedAt,
      unreadCount: chat.unreadCount,
      muted: boolToInt(chat.muted),
      pinned: boolToInt(chat.pinned),
      type: chat.type,
      participants: JSON.stringify(chat.participants || [])
    });

    const messages = chatMessages[chat.id] || [];
    for (const message of messages) {
      insertMessage.run({
        id: message.id,
        chatId: chat.id,
        sender: message.sender,
        senderId: message.senderId,
        text: message.text,
        timestamp: message.timestamp
      });
    }
  }
}

function seedContacts() {
  const insertShortcut = db.prepare(`
    INSERT INTO contact_shortcuts (id, icon, label, note)
    VALUES (@id, @icon, @label, @note)
  `);

  const insertContact = db.prepare(`
    INSERT INTO contacts (id, letter, name, avatar, status)
    VALUES (@id, @letter, @name, @avatar, @status)
  `);

  for (const shortcut of contactShortcuts) {
    insertShortcut.run({
      id: shortcut.id,
      icon: shortcut.icon,
      label: shortcut.label,
      note: shortcut.note || null
    });
  }

  for (const section of contactSections) {
    for (const contact of section.contacts) {
      insertContact.run({
        id: contact.id,
        letter: section.letter,
        name: contact.name,
        avatar: contact.avatar,
        status: contact.status
      });
    }
  }
}

function seedDiscover() {
  const insertDiscover = db.prepare(`
    INSERT INTO discover_items (id, title, subtitle, icon, badge)
    VALUES (@id, @title, @subtitle, @icon, @badge)
  `);

  for (const item of discoverItems) {
    insertDiscover.run(item);
  }
}

function seedProfile() {
  if (!profile?.user) return;

  const insertProfile = db.prepare(`
    INSERT INTO profiles (id, name, avatar, cover, wechat_id, tagline)
    VALUES (@id, @name, @avatar, @cover, @wechatId, @tagline)
  `);

  const insertAction = db.prepare(`
    INSERT INTO profile_actions (id, profile_id, label, extra)
    VALUES (@id, @profileId, @label, @extra)
  `);

  const insertSection = db.prepare(`
    INSERT INTO profile_sections (id, profile_id, title, icon, navigation)
    VALUES (@id, @profileId, @title, @icon, @navigation)
  `);

  insertProfile.run({
    id: profile.user.id,
    name: profile.user.name,
    avatar: profile.user.avatar,
    cover: profile.user.cover,
    wechatId: profile.user.wechatId,
    tagline: profile.user.tagline
  });

  for (const action of profile.quickActions || []) {
    insertAction.run({
      id: action.id,
      profileId: profile.user.id,
      label: action.label,
      extra: action.extra || null
    });
  }

  for (const section of profile.sections || []) {
    insertSection.run({
      id: section.id,
      profileId: profile.user.id,
      title: section.title,
      icon: section.icon,
      navigation: boolToInt(section.navigation)
    });
  }
}

function seedMoments() {
  const insertMoment = db.prepare(`
    INSERT INTO moments (id, author_name, author_avatar, content, created_at)
    VALUES (@id, @authorName, @authorAvatar, @content, @createdAt)
  `);

  const insertMedia = db.prepare(`
    INSERT INTO moment_media (moment_id, url)
    VALUES (@momentId, @url)
  `);

  const insertReply = db.prepare(`
    INSERT INTO moment_replies (id, moment_id, author, text)
    VALUES (@id, @momentId, @author, @text)
  `);

  for (const moment of moments) {
    insertMoment.run({
      id: moment.id,
      authorName: moment.author.name,
      authorAvatar: moment.author.avatar,
      content: moment.content,
      createdAt: moment.createdAt
    });

    for (const media of moment.media || []) {
      insertMedia.run({ momentId: moment.id, url: media });
    }

    for (const reply of moment.replies || []) {
      insertReply.run({
        id: reply.id,
        momentId: moment.id,
        author: reply.author,
        text: reply.text
      });
    }
  }
}

function setSchemaVersion(version) {
  db.prepare('INSERT OR REPLACE INTO app_meta (key, value) VALUES (?, ?)').run(
    'schema_version',
    String(version)
  );
}

function getSchemaVersion() {
  const row = db.prepare('SELECT value FROM app_meta WHERE key = ?').get('schema_version');
  return row ? Number(row.value) : null;
}

function bootstrapDatabase() {
  runMigrations();

  const currentVersion = getSchemaVersion();
  const needsReseed = currentVersion !== SCHEMA_VERSION;

  const chatCount = db.prepare('SELECT COUNT(*) as count FROM chats').get().count;

  if (needsReseed || !chatCount) {
    resetTables();
    db.transaction(() => {
      seedChats();
      seedContacts();
      seedDiscover();
      seedProfile();
      seedMoments();
      setSchemaVersion(SCHEMA_VERSION);
    })();
  }
}

module.exports = {
  bootstrapDatabase
};
