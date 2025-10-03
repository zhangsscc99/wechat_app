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

const iconEmojis = {
  'services': '💼',
  'favorites': '⭐',
  'moments': '📷',
  'orders': '💳',
  'wallet': '💰',
  'emoji': '😊',
  'stickers': '😀',
  'settings': '⚙️'
};

function getIconEmoji(iconType) {
  return iconEmojis[iconType] || '📱';
}
</script>

<template>
  <div class="profile" v-if="props.profile?.user">
    <!-- 用户信息卡片 -->
    <section class="profile-card">
      <div class="card-content">
        <img :src="props.profile.user.avatar" alt="头像" class="user-avatar" />
        <div class="user-info">
          <div class="name-section">
            <h2 class="user-name">{{ props.profile.user.name }}</h2>
            <svg class="chevron-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p class="wechat-id">微信号：{{ props.profile.user.wechatId }}</p>
          <p v-if="props.profile.user.tagline" class="user-tagline">{{ props.profile.user.tagline }}</p>
        </div>
      </div>
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
            <span class="icon-emoji">{{ getIconEmoji(item.icon) }}</span>
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
  position: relative;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  letter-spacing: -0.3px;
}

.chevron-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
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

.qr-code-button {
  position: absolute;
  top: 20px;
  right: 16px;
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

.icon-emoji {
  font-size: 20px;
  line-height: 1;
}

.menu-label {
  flex: 1;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  letter-spacing: -0.3px;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
