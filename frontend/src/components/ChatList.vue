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

const orderedChats = computed(() => {
  // 将置顶的聊天排在最前面
  const pinned = (props.chats || []).filter(chat => chat.pinned);
  const unpinned = (props.chats || []).filter(chat => !chat.pinned);
  return [...pinned, ...unpinned];
});

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
      </div>
      <div class="chat-content">
        <div class="chat-header">
          <div class="name-row">
            <h3 class="chat-name">{{ chat.name }}</h3>
            <svg v-if="chat.pinned" class="pin-icon" viewBox="0 0 16 16" aria-label="置顶">
              <path d="M8 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-4-3-4 3 1.5-4.5-3.5-2.5h4.5z" fill="#B8B8B8"/>
            </svg>
          </div>
          <span class="time">{{ formatChatTime(chat.updatedAt) }}</span>
        </div>
        <div class="chat-footer">
          <p class="subtitle" :class="{ 'has-badge': chat.unreadCount || chat.muted }">
            {{ chat.subtitle }}
          </p>
          <div class="badges">
            <span v-if="chat.muted" class="mute-badge" aria-label="消息免打扰">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="8" fill="#D8D8D8"/>
                <path d="M5 9h8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            <span v-if="chat.unreadCount && !chat.muted" class="unread-badge">
              {{ formatCountBadge(chat.unreadCount) }}
            </span>
            <span v-if="chat.unreadCount && chat.muted" class="unread-dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list {
  padding: 0 0 72px;
  overflow-y: auto;
  height: 100%;
  background: #fff;
}

.chat-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 16px;
  background: #fff;
  border-bottom: 0.5px solid #E5E5E5;
  transition: background 0.15s ease;
  cursor: pointer;
  position: relative;
}

.chat-item:active {
  background-color: #ECECEC;
}

.chat-item.pinned {
  background: #F7F7F7;
}

.avatar-wrapper {
  flex-shrink: 0;
  padding-top: 1px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  display: block;
}

.chat-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 22px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.chat-name {
  margin: 0;
  font-size: 17px;
  font-weight: 500;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.3px;
}

.pin-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 1px;
}

.time {
  font-size: 13px;
  color: #B3B3B3;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: 400;
}

.chat-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 20px;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: #999;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
}

.subtitle.has-badge {
  max-width: calc(100% - 26px);
}

.badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.mute-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mute-badge svg {
  width: 16px;
  height: 16px;
  display: block;
}

.unread-badge {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #FA5151;
  color: #fff;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #FA5151;
  border-radius: 50%;
}

.chat-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
