<script setup>
import { computed } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({})
  },
  moments: {
    type: Array,
    default: () => []
  }
});

const statusAction = computed(() =>
  (props.profile?.quickActions || []).find((action) => action.id === 'status')
);

const statusLabel = computed(() => {
  const label = statusAction.value?.label || '状态';
  return label.replace('+', '').trim() || '状态';
});

const friendsAction = computed(() =>
  (props.profile?.quickActions || []).find((action) => action.id === 'friends')
);

const statusPreviewAvatars = computed(() => {
  const fromAction = friendsAction.value?.preview || [];
  if (fromAction.length) {
    return fromAction.slice(0, 3);
  }
  const fromMoments = (props.moments || []).map((moment) => moment.author.avatar);
  return fromMoments.slice(0, 3);
});

const menuGroups = computed(() => {
  const sections = props.profile?.sections || [];
  const order = [
    ['services'],
    ['favorites'],
    ['moments'],
    ['orders'],
    ['stickers'],
    ['settings']
  ];

  const groups = order
    .map((ids) => sections.filter((item) => ids.includes(item.id)))
    .filter((group) => group.length > 0);

  if (!groups.length) {
    return sections.length ? [sections] : [];
  }

  return groups;
});

// SVG 图标路径定义
const iconPaths = {
  'services': [
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
  ],
  'favorites': [
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  ],
  'moments': [
    'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z',
    'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  ],
  'orders': [
    'M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z'
  ],
  'wallet': [
    'M21 12V7H5a2 2 0 0 1 0-4h14v4',
    'M3 5v14a2 2 0 0 0 2 2h16v-5',
    'M18 12a2 2 0 0 0 0 4h4v-4h-4z'
  ],
  'emoji': [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M8 14s1.5 2 4 2 4-2 4-2',
    'M9 9h.01M15 9h.01'
  ],
  'stickers': [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M8 14s1.5 2 4 2 4-2 4-2',
    'M9 9h.01M15 9h.01'
  ],
  'settings': [
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'
  ]
};

function getIconPaths(iconType) {
  return iconPaths[iconType] || iconPaths['services'];
}
</script>

<template>
  <div class="profile" v-if="props.profile?.user">
    <!-- 用户信息卡片 -->
    <section class="profile-card">
      <div class="card-header">
        <img :src="props.profile.user.avatar" alt="头像" class="user-avatar" />
        <div class="header-actions">
          <button class="qr-code-button" type="button" aria-label="我的二维码">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="6" height="6" fill="none" stroke="#000" stroke-width="1.5"/>
              <rect x="14" y="4" width="6" height="6" fill="none" stroke="#000" stroke-width="1.5"/>
              <rect x="4" y="14" width="6" height="6" fill="none" stroke="#000" stroke-width="1.5"/>
              <rect x="15" y="15" width="2" height="2" fill="#000"/>
              <rect x="18" y="15" width="2" height="2" fill="#000"/>
              <rect x="15" y="18" width="2" height="2" fill="#000"/>
              <rect x="18" y="18" width="2" height="2" fill="#000"/>
            </svg>
          </button>
          <svg class="chevron-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div class="card-info">
        <h2 class="user-name">{{ props.profile.user.name }}</h2>
        <p class="wechat-id">微信号：{{ props.profile.user.wechatId }}</p>
        <p v-if="props.profile.user.tagline" class="user-tagline">{{ props.profile.user.tagline }}</p>
      </div>
    </section>

    <!-- 状态栏 -->
    <section class="status-bar" v-if="statusAction || friendsAction">
      <button v-if="statusAction" class="add-status-button" type="button">
        <span class="plus-sign">+</span>
        <span class="status-text">{{ statusLabel }}</span>
      </button>
      <div class="friends-status" v-if="friendsAction">
        <div class="friend-avatars">
          <img
            v-for="(avatar, index) in statusPreviewAvatars"
            :key="index"
            :src="avatar"
            alt="好友"
            class="friend-avatar"
          />
        </div>
        <span class="friends-label">{{ friendsAction.extra || '等好友关注你' }}</span>
      </div>
    </section>

    <!-- 功能菜单 -->
    <section class="menu-section">
      <div
        v-for="(group, groupIndex) in menuGroups"
        :key="`group-${groupIndex}`"
        class="menu-group"
        :class="{ 'has-spacing': groupIndex !== 0 }"
      >
        <div
          v-for="item in group"
          :key="item.id"
          class="menu-row"
        >
          <div class="menu-icon" :data-type="item.icon">
            <svg viewBox="0 0 24 24" class="icon-svg" aria-hidden="true">
              <path
                v-for="(path, index) in getIconPaths(item.icon)"
                :key="index"
                :d="path"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="menu-label">{{ item.title }}</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile {
  padding-bottom: 72px;
  height: 100%;
  overflow-y: auto;
  background: #EFEFF4;
}

.profile::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 用户信息卡片 */
.profile-card {
  background: #fff;
  padding: 20px 16px 16px;
  margin-bottom: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qr-code-button {
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
}

.qr-code-button svg {
  width: 20px;
  height: 20px;
  display: block;
}

.chevron-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user-name {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #000;
  letter-spacing: -0.3px;
}

.wechat-id {
  margin: 0;
  font-size: 14px;
  color: #888;
  letter-spacing: -0.2px;
}

.user-tagline {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  margin-bottom: 10px;
}

.add-status-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(7, 193, 96, 0.2);
  background: rgba(7, 193, 96, 0.08);
  color: #07C160;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.add-status-button:active {
  background: rgba(7, 193, 96, 0.15);
}

.plus-sign {
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
}

.status-text {
  letter-spacing: -0.2px;
}

.friends-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.friend-avatars {
  display: flex;
  align-items: center;
}

.friend-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
  margin-left: -8px;
}

.friend-avatar:first-child {
  margin-left: 0;
}

.friends-label {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
}

/* 功能菜单 */
.menu-section {
  padding: 0;
}

.menu-group {
  background: #fff;
  margin-bottom: 10px;
}

.has-spacing {
  margin-top: 0;
}

.menu-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 0.5px solid #E5E5E5;
  cursor: pointer;
  transition: background 0.15s ease;
}

.menu-row:active {
  background: #ECECEC;
}

.menu-row:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-icon[data-type='services'] {
  background: linear-gradient(135deg, #07C160, #05A850);
}

.menu-icon[data-type='favorites'] {
  background: linear-gradient(135deg, #FFD04B, #FFC20E);
}

.menu-icon[data-type='moments'] {
  background: linear-gradient(135deg, #36A9F5, #2C99E8);
}

.menu-icon[data-type='orders'] {
  background: linear-gradient(135deg, #FF9F42, #FF7629);
}

.menu-icon[data-type='wallet'] {
  background: linear-gradient(135deg, #FF9F42, #FF7629);
}

.menu-icon[data-type='emoji'],
.menu-icon[data-type='stickers'] {
  background: linear-gradient(135deg, #FF70B8, #FF4A9F);
}

.menu-icon[data-type='settings'] {
  background: linear-gradient(135deg, #8B8B8B, #6B6B6B);
}

.icon-svg {
  width: 22px;
  height: 22px;
  display: block;
}

.menu-label {
  flex: 1;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  letter-spacing: -0.3px;
  text-align: left;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
