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
</script>

<template>
  <div class="contacts">
    <div class="shortcut" v-for="item in props.shortcuts" :key="item.id">
      <div class="icon" :data-type="item.icon" />
      <div class="shortcut-content">
        <span class="title">{{ item.label }}</span>
        <span v-if="item.note" class="subtitle">{{ item.note }}</span>
      </div>
    </div>

    <div class="index-bar">
      <span v-for="section in props.sections" :key="section.letter">{{ section.letter }}</span>
    </div>

    <div
      v-for="section in props.sections"
      :key="section.letter"
      class="contact-section"
    >
      <div class="section-title">{{ section.letter }}</div>
      <div v-for="contact in section.contacts" :key="contact.id" class="contact-item">
        <img :src="contact.avatar" :alt="contact.name" class="avatar" />
        <div class="info">
          <span class="name">{{ contact.name }}</span>
          <span class="status">{{ contact.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts {
  padding-bottom: 72px;
  padding-right: 26px;
  overflow-y: auto;
  height: 100%;
  background: #f4f4f4;
  position: relative;
}

.contacts::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #fff;
  border-bottom: 1px solid #ededed;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.icon[data-type='user-plus'] {
  background: linear-gradient(135deg, #ff9b44, #ff692d);
}

.icon[data-type='chat-only'] {
  background: linear-gradient(135deg, #ffb347, #ffcc33);
}

.icon[data-type='group-chat'] {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.icon[data-type='tag'] {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
}

.icon[data-type='official'],
.icon[data-type='service'],
.icon[data-type='services'] {
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
}

.shortcut-content {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
}

.subtitle {
  font-size: 12px;
  color: #a0a0a0;
}

.index-bar {
  position: absolute;
  right: 6px;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  color: #1aad19;
  text-align: center;
}

.contact-section {
  margin-top: 8px;
}

.section-title {
  padding: 6px 16px;
  font-size: 12px;
  color: #6b6b6b;
  background: #f0f0f0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #ededed;
}

.contact-item .avatar {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: #111;
}

.status {
  margin-top: 2px;
  font-size: 12px;
  color: #8e8e8e;
}
</style>
