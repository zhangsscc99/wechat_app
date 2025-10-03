<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ChatList from './components/ChatList.vue';
import ChatDetail from './components/ChatDetail.vue';
import ContactsView from './components/ContactsView.vue';
import DiscoverView from './components/DiscoverView.vue';
import ProfileView from './components/ProfileView.vue';
import MomentsView from './components/MomentsView.vue';
import {
  getChats,
  getChat,
  postChatMessage,
  getContacts,
  getDiscover,
  getProfile,
  getMoments
} from './services/api';
import { formatCountBadge } from './utils/format';

const tabs = [
  { key: 'wechat', label: '微信', icon: 'chat' },
  { key: 'contacts', label: '通讯录', icon: 'contacts' },
  { key: 'discover', label: '发现', icon: 'discover' },
  { key: 'me', label: '我', icon: 'me' }
];

const navIcons = {
  search: ['M11.5 18a6.5 6.5 0 1 1 4.6-11.1 6.5 6.5 0 0 1-4.6 11.1z', 'M17 17l3.5 3.5'],
  add: ['M12 5v14', 'M5 12h14'],
  qr: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M16 14h2v2h-2z', 'M14 18h6', 'M14 16h2'],
  settings: [
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M4.93 6.58l1.41 1.41',
    'M4 12h2',
    'M6.34 17.66l1.41-1.41',
    'M12 4V2',
    'M19.07 6.58l-1.41 1.41',
    'M20 12h-2',
    'M17.66 17.66l-1.41-1.41',
    'M12 22v-2'
  ]
};

const tabIcons = {
  chat: ['M4.5 5h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6.3l-4.5 3.4V18H4.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z'],
  contacts: ['M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7H5z'],
  discover: ['M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M9 9l8-3-3 8-8 3z'],
  me: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M5 20a7 7 0 0 1 14 0H5z']
};

const activeTab = ref('wechat');
const chatList = ref([]);
const selectedChat = ref(null);
const contacts = ref({ shortcuts: [], sections: [] });
const discover = ref([]);
const profile = ref({});
const moments = ref([]);
const showMoments = ref(false);
const loadingChat = ref(false);
const errorMessage = ref('');
const statusTime = ref(getTimeString());

let errorTimer = null;
let clockTimer = null;

const totalUnread = computed(() =>
  (chatList.value || []).reduce((sum, chat) => sum + (chat.unreadCount || 0), 0)
);

const shouldShowNav = computed(() => !selectedChat.value);

const navTitle = computed(() => {
  switch (activeTab.value) {
    case 'wechat':
      return '微信';
    case 'contacts':
      return '通讯录';
    case 'discover':
      return '发现';
    case 'me':
      return profile.value?.user?.name || '我';
    default:
      return 'WeTalk';
  }
});

const navTitleBadge = computed(() => {
  if (activeTab.value === 'wechat' && totalUnread.value) {
    return formatCountBadge(totalUnread.value);
  }
  return '';
});

const navSubtitle = computed(() => {
  if (selectedChat.value) return '';
  if (activeTab.value === 'wechat') {
    return totalUnread.value ? '' : '聊天、文件与小程序';
  }
  if (activeTab.value === 'contacts') {
    return '我的企业及企业联系人';
  }
  return '';
});

const navActions = computed(() => {
  if (selectedChat.value) return [];
  if (activeTab.value === 'me') {
    return ['qr', 'settings'];
  }
  return ['search', 'add'];
});

const navLeftType = computed(() => (selectedChat.value ? 'back' : 'menu'));

const navBadges = computed(() => ({
  wechat: totalUnread.value > 0 ? formatCountBadge(totalUnread.value) : '',
  contacts: '',
  discover: discover.value.some((item) => item.badge > 0),
  me: false
}));

const currentUserId = computed(() => profile.value?.user?.id || 'user-self');

function getTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function showError(error) {
  console.error(error);
  errorMessage.value = error.message || '网络异常，请稍后再试';
  if (errorTimer) {
    clearTimeout(errorTimer);
  }
  errorTimer = setTimeout(() => {
    errorMessage.value = '';
  }, 3200);
}

async function refreshChats() {
  try {
    chatList.value = await getChats();
  } catch (error) {
    showError(error);
  }
}

async function loadContacts() {
  try {
    contacts.value = await getContacts();
  } catch (error) {
    showError(error);
  }
}

async function loadDiscover() {
  try {
    discover.value = await getDiscover();
  } catch (error) {
    showError(error);
  }
}

async function loadProfile() {
  try {
    profile.value = await getProfile();
  } catch (error) {
    showError(error);
  }
}

async function loadMoments() {
  try {
    moments.value = await getMoments();
  } catch (error) {
    showError(error);
  }
}

async function handleOpenChat(chat) {
  loadingChat.value = true;
  try {
    const detail = await getChat(chat.id);
    selectedChat.value = detail;
    activeTab.value = 'wechat';
  } catch (error) {
    showError(error);
  } finally {
    loadingChat.value = false;
  }
}

function closeChat() {
  selectedChat.value = null;
}

async function handleSendMessage(text) {
  if (!selectedChat.value) return;
  try {
    const message = await postChatMessage(selectedChat.value.id, text);
    selectedChat.value.messages.push(message);
    selectedChat.value.lastMessage = message;
    await refreshChats();
  } catch (error) {
    showError(error);
  }
}

function handleTabChange(tabKey) {
  activeTab.value = tabKey;
  if (tabKey !== 'wechat') {
    selectedChat.value = null;
  }
}

function handleDiscoverOpen(item) {
  if (item.id === 'moments') {
    showMoments.value = true;
  }
}

function closeMoments() {
  showMoments.value = false;
}

function handleNavLeft() {
  if (selectedChat.value) {
    closeChat();
  }
}

onMounted(() => {
  refreshChats();
  loadContacts();
  loadDiscover();
  loadProfile();
  loadMoments();
  clockTimer = setInterval(() => {
    statusTime.value = getTimeString();
  }, 60000);
});

onUnmounted(() => {
  if (errorTimer) {
    clearTimeout(errorTimer);
  }
  if (clockTimer) {
    clearInterval(clockTimer);
  }
});
</script>

<template>
  <div class="phone-frame">
    <header v-if="shouldShowNav" class="nav-bar">
      <button class="nav-left" :class="navLeftType" type="button" @click="handleNavLeft">
        <svg v-if="navLeftType === 'back'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-else>···</span>
      </button>

      <div class="nav-titles">
        <h1>
          <span>{{ navTitle }}</span>
          <span v-if="navTitleBadge" class="nav-title-badge">({{ navTitleBadge }})</span>
        </h1>
        <p v-if="navSubtitle" class="nav-subtitle">{{ navSubtitle }}</p>
      </div>

      <div class="nav-actions">
        <button
          v-for="action in navActions"
          :key="action"
          class="icon-button"
          type="button"
          aria-label="action"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              v-for="(path, index) in navIcons[action]"
              :key="index"
              :d="path"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <main class="content" :class="[`content-${activeTab}`, { 'content-chat-open': selectedChat }]">
      <ChatList
        v-if="activeTab === 'wechat' && !selectedChat"
        :chats="chatList"
        :active-chat-id="selectedChat?.id || null"
        @select="handleOpenChat"
      />

      <div v-if="loadingChat" class="loading-state">
        <span class="spinner" />
        <span>正在打开会话…</span>
      </div>

      <ChatDetail
        v-if="selectedChat"
        :chat="selectedChat"
        :messages="selectedChat?.messages || []"
        :current-user-id="currentUserId"
        @close="closeChat"
        @send="handleSendMessage"
      />

      <ContactsView
        v-if="activeTab === 'contacts'"
        :shortcuts="contacts.shortcuts"
        :sections="contacts.sections"
      />

      <DiscoverView
        v-if="activeTab === 'discover'"
        :items="discover"
        @open="handleDiscoverOpen"
      />

      <ProfileView
        v-if="activeTab === 'me'"
        :profile="profile"
        :moments="moments"
      />
    </main>

    <footer class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-button"
        :class="{ active: tab.key === activeTab }"
        type="button"
        @click="handleTabChange(tab.key)"
      >
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              v-for="(path, index) in tabIcons[tab.icon]"
              :key="index"
              :d="path"
            />
          </svg>
          <span
            v-if="tab.key === 'wechat' && navBadges.wechat"
            class="tab-badge"
          >
            {{ navBadges.wechat }}
          </span>
          <span
            v-else-if="tab.key === 'discover' && navBadges.discover"
            class="tab-dot"
          />
        </div>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </footer>

    <div v-if="errorMessage" class="toast">{{ errorMessage }}</div>

    <MomentsView
      v-if="showMoments"
      :moments="moments"
      :profile="profile"
      @close="closeMoments"
    />
  </div>
</template>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: #ededed;
  overflow: hidden;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 4px;
  font-size: 12px;
  color: #616161;
  background: #fefefe;
}

.status-time {
  font-weight: 600;
  letter-spacing: 0.4px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-icons .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5a5a5a;
}

.status-icons .mini-app,
.status-icons .cloud,
.status-icons .bell {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.status-icons .mini-app {
  background: linear-gradient(135deg, #ff6262, #ff2f5f);
}

.status-icons .cloud {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.status-icons .bell {
  background: linear-gradient(135deg, #facc15, #f97316);
}

.status-icons .signal {
  font-weight: 600;
}

.status-icons .battery svg {
  width: 24px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
}

.nav-bar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px 10px;
  background: #f7f7f7;
  border-bottom: 1px solid #dcdcdc;
  min-height: 56px;
}

.nav-left {
  border: none;
  background: none;
  padding: 6px;
  color: #3a3a3a;
  font-size: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.nav-left.back svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.nav-titles {
  flex: 1;
  text-align: center;
}

.nav-titles h1 {
  margin: 0;
  font-size: 22px;
  color: #111;
  font-weight: 700;
}

.nav-title-badge {
  font-size: 16px;
  margin-left: 2px;
  color: #111;
  font-weight: 500;
}

.nav-subtitle {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8b8b8b;
}

.nav-actions {
  display: flex;
  gap: 12px;
}

.icon-button {
  border: none;
  background: rgba(0, 0, 0, 0.04);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.icon-button svg {
  width: 18px;
  height: 18px;
}

.content {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #ededed;
}

.content-wechat {
  background: #fff;
}

.content-contacts {
  background: #EFEFF4;
}

.content-discover,
.content-me {
  background: #EFEFF4;
}

.loading-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(247, 247, 247, 0.9);
  z-index: 5;
  font-size: 13px;
  color: #666;
}

.spinner {
  width: 26px;
  height: 26px;
  border: 3px solid #d5d5d5;
  border-top-color: #1aad19;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 4px 0 10px;
  background: #fbfbfb;
  border-top: 1px solid #dcdcdc;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #7F7F7F;
  padding: 4px 0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-button svg {
  width: 25px;
  height: 25px;
  fill: currentColor;
}

.tab-button.active {
  color: #07C160;
  font-weight: 500;
}

.tab-button.active svg {
  stroke: #07C160;
}

.tab-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-badge {
  position: absolute;
  top: -6px;
  right: -14px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #FA5151;
  color: #fff;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.tab-dot {
  position: absolute;
  top: -3px;
  right: -6px;
  width: 8px;
  height: 8px;
  background: #FA5151;
  border-radius: 50%;
}

.toast {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 16px;
  font-size: 12px;
  letter-spacing: 0.4px;
  z-index: 20;
}

.content :deep(.chat-detail) {
  z-index: 10;
}

.content :deep(.moments-overlay) {
  z-index: 30;
}
</style>
