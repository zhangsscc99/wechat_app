<script setup>
const props = defineProps({
  shortcuts: {
    type: Array,
    default: () => []
  },
  sections: {
    type: Array,
    default: () => []
  }
});

const iconMap = {
  'user-plus': '👥',
  'chat-only': '💬',
  'group-chat': '👥',
  'tag': '🏷️',
  'official': '📢',
  'service': '🔧',
  'services': '🔧'
};

function getIconEmoji(iconType) {
  return iconMap[iconType] || '📱';
}
</script>

<template>
  <div class="contacts">
    <!-- 快捷入口 -->
    <div class="shortcuts-section">
      <div 
        class="shortcut-item" 
        v-for="item in props.shortcuts" 
        :key="item.id"
      >
        <div class="shortcut-icon" :data-type="item.icon">
          <span class="icon-emoji">{{ getIconEmoji(item.icon) }}</span>
        </div>
        <div class="shortcut-content">
          <span class="shortcut-label">{{ item.label }}</span>
          <span v-if="item.note" class="shortcut-note">{{ item.note }}</span>
        </div>
        <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <!-- 字母索引 -->
    <div class="index-bar">
      <span 
        v-for="section in props.sections" 
        :key="section.letter"
        class="index-letter"
      >
        {{ section.letter }}
      </span>
    </div>

    <!-- 联系人列表 -->
    <div
      v-for="section in props.sections"
      :key="section.letter"
      class="contact-section"
    >
      <div class="section-header">{{ section.letter }}</div>
      <div class="section-items">
        <div 
          v-for="contact in section.contacts" 
          :key="contact.id" 
          class="contact-item"
        >
          <img :src="contact.avatar" :alt="contact.name" class="contact-avatar" />
          <div class="contact-info">
            <span class="contact-name">{{ contact.name }}</span>
            <span v-if="contact.status" class="contact-status">{{ contact.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts {
  padding-bottom: 72px;
  padding-right: 20px;
  overflow-y: auto;
  height: 100%;
  background: #EFEFF4;
  position: relative;
}

.contacts::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 快捷入口区域 */
.shortcuts-section {
  background: #fff;
  margin-bottom: 10px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 0.5px solid #E5E5E5;
  cursor: pointer;
  transition: background 0.15s ease;
}

.shortcut-item:active {
  background: #ECECEC;
}

.shortcut-item:last-child {
  border-bottom: none;
}

.shortcut-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.shortcut-icon[data-type='user-plus'] {
  background: linear-gradient(135deg, #FF9F42, #FF7629);
}

.shortcut-icon[data-type='chat-only'] {
  background: linear-gradient(135deg, #FFD04B, #FFC20E);
}

.shortcut-icon[data-type='group-chat'] {
  background: linear-gradient(135deg, #26C65F, #1AAF4C);
}

.shortcut-icon[data-type='tag'] {
  background: linear-gradient(135deg, #36A9F5, #2C99E8);
}

.shortcut-icon[data-type='official'],
.shortcut-icon[data-type='service'],
.shortcut-icon[data-type='services'] {
  background: linear-gradient(135deg, #5A8CEC, #4A7CE1);
}

.icon-emoji {
  font-size: 22px;
  line-height: 1;
}

.shortcut-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.shortcut-label {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  letter-spacing: -0.3px;
}

.shortcut-note {
  font-size: 13px;
  color: #999;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 字母索引 */
.index-bar {
  position: absolute;
  right: 2px;
  top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  z-index: 10;
  user-select: none;
}

.index-letter {
  font-size: 10px;
  color: #576B95;
  font-weight: 500;
  line-height: 14px;
  padding: 1px 4px;
  cursor: pointer;
}

/* 联系人分组 */
.contact-section {
  margin-bottom: 0;
}

.section-header {
  padding: 4px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  background: #EFEFF4;
  letter-spacing: 0.5px;
}

.section-items {
  background: #fff;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 0.5px solid #E5E5E5;
  cursor: pointer;
  transition: background 0.15s ease;
}

.contact-item:active {
  background: #ECECEC;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-avatar {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.contact-name {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  letter-spacing: -0.3px;
}

.contact-status {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
