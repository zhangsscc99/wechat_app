<script setup>
import { computed } from 'vue';
import { formatCountBadge } from '../utils/format';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open']);

const groups = computed(() => {
  const order = [
    ['moments'],
    ['live', 'scan', 'listen'],
    ['games'],
    ['mini-apps']
  ];

  const grouped = order
    .map((ids) => props.items.filter((item) => ids.includes(item.id)))
    .filter((group) => group.length > 0);

  if (!grouped.length) {
    return props.items.length ? [props.items] : [];
  }

  return grouped;
});

const iconEmojis = {
  'moments': '📷',
  'live': '📹',
  'scan': '📱',
  'listen': '🎵',
  'games': '🎮',
  'mini-app': '📲'
};

function getIconEmoji(iconType) {
  return iconEmojis[iconType] || '⭐';
}

function handleOpen(item) {
  emit('open', item);
}
</script>

<template>
  <div class="discover">
    <div
      v-for="(group, index) in groups"
      :key="`group-${index}`"
      class="discover-group"
      :class="{ 'has-spacing': index !== 0 }"
    >
      <div
        v-for="item in group"
        :key="item.id"
        class="discover-item"
        @click="handleOpen(item)"
      >
        <div class="item-left">
          <div class="item-icon" :data-type="item.icon">
            <span class="icon-emoji">{{ getIconEmoji(item.icon) }}</span>
          </div>
          <div class="item-content">
            <span class="item-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="item-subtitle">{{ item.subtitle }}</span>
          </div>
        </div>
        <div class="item-right">
          <span v-if="item.badge" class="item-badge">
            {{ formatCountBadge(item.badge) }}
          </span>
          <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discover {
  padding: 10px 0 72px;
  height: 100%;
  overflow-y: auto;
  background: #EFEFF4;
}

.discover::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.discover-group {
  background: #fff;
}

.has-spacing {
  margin-top: 10px;
}

.discover-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 0.5px solid #E5E5E5;
  cursor: pointer;
  transition: background 0.15s ease;
}

.discover-item:active {
  background: #ECECEC;
}

.discover-item:last-child {
  border-bottom: none;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.item-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.item-icon[data-type='moments'] {
  background: linear-gradient(135deg, #FF9F42, #FF7629);
}

.item-icon[data-type='live'] {
  background: linear-gradient(135deg, #FF6B6B, #FF4444);
}

.item-icon[data-type='scan'] {
  background: linear-gradient(135deg, #36A9F5, #2C99E8);
}

.item-icon[data-type='listen'] {
  background: linear-gradient(135deg, #FF70B8, #FF4A9F);
}

.item-icon[data-type='games'] {
  background: linear-gradient(135deg, #FFD04B, #FFC20E);
}

.item-icon[data-type='mini-app'] {
  background: linear-gradient(135deg, #A066F7, #8B4FED);
}

.icon-emoji {
  font-size: 24px;
  line-height: 1;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  letter-spacing: -0.3px;
}

.item-subtitle {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.item-badge {
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

.arrow-icon {
  width: 16px;
  height: 16px;
}
</style>
