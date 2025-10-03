<script setup>
import { formatMomentTime } from '../utils/format';

const props = defineProps({
  moments: {
    type: Array,
    default: () => []
  },
  profile: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close']);
</script>

<template>
  <div class="moments-overlay">
    <div class="moments-panel">
      <header class="moments-header">
        <button class="back" @click="() => emit('close')" aria-label="返回">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5.5 9 12l6.5 6.5" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
        </button>
        <span class="title">朋友圈</span>
      </header>

      <div class="cover">
        <img :src="props.profile?.user?.cover" alt="封面" class="cover-img" />
        <div class="cover-info">
          <span class="name">{{ props.profile?.user?.name }}</span>
          <img :src="props.profile?.user?.avatar" alt="头像" class="avatar" />
        </div>
      </div>

      <div class="moments-list">
        <article v-for="moment in props.moments" :key="moment.id" class="moment">
          <div class="moment-avatar">
            <img :src="moment.author.avatar" :alt="moment.author.name" />
          </div>
          <div class="moment-body">
            <div class="moment-top">
              <h3>{{ moment.author.name }}</h3>
              <p class="content">{{ moment.content }}</p>
            </div>
            <div class="moment-media" v-if="moment.media?.length">
              <img v-for="(media, index) in moment.media" :key="index" :src="media" alt="配图" />
            </div>
            <div class="moment-meta">
              <span class="time">{{ formatMomentTime(moment.createdAt) }}</span>
              <button class="actions" aria-label="更多">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.moments-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 12px 12px;
}

.moments-panel {
  width: 100%;
  max-width: 420px;
  background: #111;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 48px);
}

.moments-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
}

.back {
  border: none;
  background: none;
  color: #fff;
  padding: 4px;
}

.title {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
}

.cover {
  position: relative;
}

.cover-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.cover-info {
  position: absolute;
  inset: auto 16px -40px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cover-info .name {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.cover-info .avatar {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  border: 3px solid #fff;
  object-fit: cover;
}

.moments-list {
  flex: 1;
  background: #f5f5f5;
  padding: 56px 12px 12px;
  overflow-y: auto;
}

.moments-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.moment {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.moment-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
}

.moment-body {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.moment-top h3 {
  margin: 0;
  font-size: 14px;
  color: #111;
}

.content {
  margin: 6px 0 0;
  font-size: 13px;
  color: #2c2c2c;
  line-height: 1.5;
}

.moment-media {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.moment-media img {
  width: 100%;
  height: 88px;
  object-fit: cover;
  border-radius: 8px;
}

.moment-meta {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #8d8d8d;
}

.actions {
  border: none;
  background: none;
  color: #8d8d8d;
}

.actions svg {
  width: 18px;
  height: 18px;
}
</style>
