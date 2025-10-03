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
</script>

<template>
  <div class="profile" v-if="props.profile?.user">
    <section class="profile-header">
      <img :src="props.profile.user.avatar" alt="头像" class="avatar" />
      <div class="header-info">
        <div class="name-row">
          <h2>{{ props.profile.user.name }}</h2>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="#c0c0c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <p class="wechat-id">微信号：{{ props.profile.user.wechatId }}</p>
        <p class="tagline">{{ props.profile.user.tagline }}</p>
      </div>
      <button class="qr-button" type="button" aria-label="二维码">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM16 14h2v2h-2zM14 18h2M20 18h2M20 16h2" fill="none" stroke="#6b6b6b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </section>

    <section class="status-strip">
      <button v-if="statusAction" class="status-button" type="button">
        <span class="plus">+</span>
        <span>{{ statusLabel }}</span>
      </button>
      <div class="status-friends" v-if="friendsAction">
        <div class="avatar-stack">
          <img
            v-for="(avatar, index) in statusPreviewAvatars"
            :key="index"
            :src="avatar"
            alt="好友头像"
          />
        </div>
        <span class="friends-text">{{ friendsAction.extra || '等好友关注你' }}</span>
      </div>
    </section>

    <section class="profile-menu">
      <div
        v-for="(group, groupIndex) in menuGroups"
        :key="`group-${groupIndex}`"
        class="menu-group"
        :class="{ 'menu-group-spaced': groupIndex !== 0 }"
      >
        <div
          v-for="item in group"
          :key="item.id"
          class="menu-item"
        >
          <div class="icon" :data-type="item.icon" />
          <span class="label">{{ item.title }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="#d0d0d0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
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
  background: #ededed;
}

.profile::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 16px 12px;
  background: #fff;
  border-bottom: 1px solid #ededed;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  object-fit: cover;
}

.header-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.name-row h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.name-row svg {
  width: 16px;
  height: 16px;
}

.wechat-id {
  margin: 6px 0 0;
  font-size: 13px;
  color: #8a8a8a;
}

.tagline {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6d6d6d;
}

.qr-button {
  border: none;
  background: none;
  padding: 6px;
}

.qr-button svg {
  width: 28px;
  height: 28px;
}

.status-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 12px;
  background: #fff;
  border-bottom: 1px solid #ededed;
}

.status-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(26, 173, 25, 0.2);
  background: rgba(26, 173, 25, 0.1);
  color: #1aad19;
  font-size: 14px;
  font-weight: 600;
}

.plus {
  font-size: 16px;
  line-height: 1;
}

.status-friends {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8d8d8d;
  font-size: 12px;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.avatar-stack img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
  margin-left: -8px;
}

.avatar-stack img:first-child {
  margin-left: 0;
}

.friends-text {
  white-space: nowrap;
}

.profile-menu {
  padding: 12px 0 32px;
}

.menu-group {
  background: #fff;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
}

.menu-group-spaced {
  margin-top: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: linear-gradient(135deg, #1aad19, #0b840b);
}

.icon[data-type='favorites'] {
  background: linear-gradient(135deg, #ffba00, #ff9030);
}

.icon[data-type='moments'] {
  background: linear-gradient(135deg, #38a1ff, #2d6cff);
}

.icon[data-type='wallet'] {
  background: linear-gradient(135deg, #ff9a62, #ff6b3d);
}

.icon[data-type='emoji'] {
  background: linear-gradient(135deg, #f472b6, #ec4899);
}

.icon[data-type='settings'] {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.label {
  flex: 1;
  font-size: 16px;
  color: #111;
}

.menu-item svg {
  width: 18px;
  height: 18px;
}
</style>
