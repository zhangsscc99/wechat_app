<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import { formatChatTime } from '../utils/format';

const props = defineProps({
  chat: {
    type: Object,
    default: null
  },
  messages: {
    type: Array,
    default: () => []
  },
  currentUserId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'send']);

const inputValue = ref('');
const messagesContainer = ref(null);
const hasText = computed(() => inputValue.value.trim().length > 0);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(scrollToBottom);

watch(
  () => props.messages.length,
  () => {
    scrollToBottom();
  }
);

function handleSend() {
  const text = inputValue.value.trim();
  if (!text) return;
  emit('send', text);
  inputValue.value = '';
}

function handleKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
}

function isSelf(message) {
  return message.senderId === props.currentUserId;
}
</script>

<template>
  <div class="chat-detail">
    <header class="chat-header">
      <button class="back-button" @click="() => emit('close')" aria-label="返回">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5.5 9 12l6.5 6.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
      </button>
      <div class="info">
        <h2>{{ props.chat?.name || '会话' }}</h2>
        <p v-if="props.chat?.participants" class="participants">
          {{ props.chat.participants.join('、') }}
        </p>
      </div>
      <button class="more-button" aria-label="更多">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
      </button>
    </header>

    <div class="messages" ref="messagesContainer">
      <div
        v-for="message in props.messages"
        :key="message.id"
        class="bubble-row"
        :class="{ self: isSelf(message) }"
      >
        <div v-if="!isSelf(message)" class="bubble-avatar">
          <img :src="props.chat?.avatar" :alt="props.chat?.name" />
        </div>
        <div class="bubble">
          <p class="bubble-text">{{ message.text }}</p>
          <span class="bubble-time">{{ formatChatTime(message.timestamp) }}</span>
        </div>
      </div>
    </div>

    <div class="input-bar">
      <button class="input-icon" type="button" aria-label="语音">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-6 7a1 1 0 0 0-2 0 8 8 0 0 0 7 7.93V21H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-2v-3.07A8 8 0 0 0 20 10a1 1 0 1 0-2 0 6 6 0 1 1-12 0z" />
        </svg>
      </button>
      <textarea
        v-model="inputValue"
        placeholder="发送消息"
        @keydown="handleKeydown"
      />
      <div class="input-actions">
        <button class="input-icon" type="button" aria-label="表情">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-4 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-8 3.5a3.5 3.5 0 0 0 7 0 1 1 0 0 0-2 0 1.5 1.5 0 0 1-3 0 1 1 0 0 0-2 0z" />
          </svg>
        </button>
        <button
          v-if="!hasText"
          class="input-icon"
          type="button"
          aria-label="更多"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16v3H4zM4 10.5h16v3H4zM4 17h9.5v3H4z" />
          </svg>
        </button>
        <button
          v-else
          class="send-button"
          type="button"
          :disabled="!hasText"
          @click="handleSend"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-detail {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #ededed;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #d7d7d7;
}

.back-button,
.more-button {
  border: none;
  background: none;
  color: #1a1a1a;
  padding: 6px;
}

.back-button svg,
.more-button svg {
  width: 22px;
  height: 22px;
}

.info {
  flex: 1;
  text-align: center;
}

.info h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111;
}

.participants {
  margin: 4px 0 0;
  font-size: 12px;
  color: #7b7b7b;
}

.messages {
  flex: 1;
  padding: 16px 12px 20px;
  overflow-y: auto;
  background-image: linear-gradient(180deg, #e5e5e5 0%, #fafafa 30%, #fafafa 100%);
}

.messages::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.bubble-row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;
  gap: 8px;
}

.bubble-row.self {
  justify-content: flex-end;
}

.bubble-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}

.bubble {
  max-width: 70%;
  background: #ffffff;
  border-radius: 12px;
  padding: 10px 12px;
  position: relative;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.bubble-row.self .bubble {
  background: #95ec69;
  border-bottom-right-radius: 4px;
}

.bubble-row:not(.self) .bubble {
  border-bottom-left-radius: 4px;
  background: #ffffff;
}

.bubble-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
  color: #111;
  white-space: pre-wrap;
}

.bubble-row.self .bubble-text {
  color: #052b0f;
}

.bubble-time {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #8e8e93;
  text-align: right;
}

.input-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #d7d7d7;
  background-color: #f5f5f5;
}

.input-bar textarea {
  flex: 1;
  min-height: 36px;
  max-height: 120px;
  resize: none;
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.4;
  background: #fff;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-icon {
  border: none;
  background: none;
  padding: 4px;
  color: #5c5c5c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.input-icon svg {
  width: 22px;
  height: 22px;
}

.send-button {
  border: none;
  background-color: #1aad19;
  color: #fff;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(26, 173, 25, 0.2);
}

.send-button:disabled {
  background-color: #b5ebbb;
  cursor: not-allowed;
}
</style>
