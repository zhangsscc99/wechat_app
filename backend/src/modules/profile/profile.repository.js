const db = require('../../database/connection');

const profileStmt = db.prepare('SELECT * FROM profiles LIMIT 1');
const actionsStmt = db.prepare('SELECT * FROM profile_actions WHERE profile_id = ? ORDER BY rowid');
const sectionsStmt = db.prepare('SELECT * FROM profile_sections WHERE profile_id = ? ORDER BY rowid');

function findProfile() {
  const row = profileStmt.get();
  if (!row) return null;

  const actions = actionsStmt.all(row.id).map((item) => ({
    id: item.id,
    label: item.label,
    extra: item.extra
  }));

  const sections = sectionsStmt.all(row.id).map((item) => ({
    id: item.id,
    title: item.title,
    icon: item.icon,
    navigation: Boolean(item.navigation)
  }));

  return {
    user: {
      id: row.id,
      name: row.name,
      avatar: row.avatar,
      cover: row.cover,
      wechatId: row.wechat_id,
      tagline: row.tagline
    },
    quickActions: actions,
    sections
  };
}

module.exports = {
  findProfile
};
