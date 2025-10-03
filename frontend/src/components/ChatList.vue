<script setup>
import { computed } from 'vue';
import { formatChatTime, formatCountBadge } from '../utils/format';

const props = defineProps({
  chats: {
    type: Array,
    default: () => []
  },
  activeChatId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select']);

const orderedChats = computed(() => props.chats || []);

function handleSelect(chat) {
  emit('select', chat);
}
</script>

<template>
  <div class="chat-list">
    <div
      v-for="chat in orderedChats"
      :key="chat.id"
      class="chat-item"
      :class="{
        active: chat.id === props.activeChatId,
        muted: chat.muted,
        pinned: chat.pinned
      }"
      @click="handleSelect(chat)"
    >
      <div class="avatar-wrapper">
        <img :src="chat.avatar" class="avatar" :alt="chat.name" />
        <span v-if="chat.pinned" class="pin-indicator" />
      </div>
      <div class="chat-content">
        <div class="chat-row">
          <h3>{{ chat.name }}</h3>
          <span class="time">{{ formatChatTime(chat.updatedAt) }}</span>
        </div>
        <div class="chat-row">
          <p class="subtitle">{{ chat.subtitle }}</p>
          <span v-if="chat.muted" class="mute-icon" aria-label="muted">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 10v4h3l4 4V6l-4 4H4zM16 9l4 6M20 9l-4 6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <span v-if="chat.unreadCount" class="unread">{{ formatCountBadge(chat.unreadCount) }}</span>
    </div>
  </div>
</template>

<style scoped>

.chat-list {
  padding: 8px 0 72px;
  overflow-y: auto;
  height: 100%;
  background: #f5f5f5;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  transition: background 0.2s ease;
}

.chat-item.active {
  background-color: #e5f7e6;
}

.chat-item:active {
  background-color: #d7d7d7;
}

.chat-item.pinned {
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.pin-indicator {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1aad19;
  border: 2px solid #fff;
}

.chat-content {
  flex: 1;
  min-width: 0;
}

.chat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  font-size: 12px;
  color: #989898;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  color: #666;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mute-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  color: #bbb;
}

.unread {
  min-width: 20px;
  padding: 2px 6px;
  background-color: #f24949;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.chat-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
