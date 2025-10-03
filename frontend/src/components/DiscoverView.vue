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
      :class="{ 'group-gap': index !== 0 }"
    >
      <div
        v-for="item in group"
        :key="item.id"
        class="discover-item"
        @click="handleOpen(item)"
      >
        <div class="left">
          <div class="icon" :data-type="item.icon" />
          <div class="text">
            <span class="title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</span>
          </div>
        </div>
        <div class="right">
          <span v-if="item.badge" class="badge">{{ formatCountBadge(item.badge) }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="#d0d0d0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discover {
  padding: 12px 0 72px;
  height: 100%;
  overflow-y: auto;
  background: #f4f4f4;
}

.discover::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.discover-group {
  background: #fff;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.group-gap {
  margin-top: 12px;
}

.discover-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #ececec;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
}

.discover-item:last-child {
  border-bottom: none;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon[data-type='moments'] {
  background: conic-gradient(#ffba00, #ffa115, #ff7f50, #ffba00);
}

.icon[data-type='live'] {
  background: radial-gradient(circle at 30% 30%, #ff8a8a, #ff4d4d);
}

.icon[data-type='scan'] {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
}

.icon[data-type='listen'] {
  background: linear-gradient(135deg, #f472b6, #ec4899);
}

.icon[data-type='games'] {
  background: linear-gradient(135deg, #facc15, #f97316);
}

.icon[data-type='mini-app'] {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
}

.text {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
}

.subtitle {
  margin-top: 2px;
  font-size: 12px;
  color: #8e8e8e;
}

.right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  min-width: 18px;
  padding: 2px 6px;
  background-color: #ff5151;
  color: #fff;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

svg {
  width: 18px;
  height: 18px;
}
</style>
