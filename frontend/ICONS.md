# 图标系统说明

## 概述
本项目使用专业的 SVG 图标系统，灵感来源于 **Lucide Icons** 和 **Heroicons**，采用简洁现代的线条风格。

## 设计规范

### 视觉规范
- **描边宽度**: 2px
- **线帽样式**: round（圆角）
- **连接样式**: round（圆角）
- **图标尺寸**: 22-24px
- **颜色**: 白色（stroke="white"）
- **背景**: 渐变色圆角矩形

### 图标列表

#### 通讯录页面 (ContactsView.vue)
| 图标类型 | 名称 | 背景色 | 用途 |
|---------|------|--------|------|
| user-plus | 新朋友 | #FF9F42 → #FF7629 | 添加好友 |
| chat-only | 仅聊天 | #FFD04B → #FFC20E | 纯聊天功能 |
| group-chat | 群聊 | #26C65F → #1AAF4C | 群组聊天 |
| tag | 标签 | #36A9F5 → #2C99E8 | 联系人标签 |
| official | 公众号 | #5A8CEC → #4A7CE1 | 订阅号/服务号 |
| service | 服务 | #5A8CEC → #4A7CE1 | 企业服务 |

#### 发现页面 (DiscoverView.vue)
| 图标类型 | 名称 | 背景色 | 用途 |
|---------|------|--------|------|
| moments | 朋友圈 | #FF9F42 → #FF7629 | 社交动态 |
| live | 直播 | #FF6B6B → #FF4444 | 视频直播 |
| scan | 扫一扫 | #36A9F5 → #2C99E8 | 二维码扫描 |
| listen | 听音乐 | #FF70B8 → #FF4A9F | 音乐播放 |
| games | 游戏 | #FFD04B → #FFC20E | 小游戏 |
| mini-app | 小程序 | #A066F7 → #8B4FED | 小程序入口 |

#### 个人页面 (ProfileView.vue)
| 图标类型 | 名称 | 背景色 | 用途 |
|---------|------|--------|------|
| services | 服务 | #07C160 → #05A850 | 企业服务 |
| favorites | 收藏 | #FFD04B → #FFC20E | 收藏内容 |
| moments | 相册 | #36A9F5 → #2C99E8 | 照片相册 |
| orders | 订单 | #FF9F42 → #FF7629 | 订单管理 |
| wallet | 钱包 | #FF9F42 → #FF7629 | 支付钱包 |
| stickers | 表情 | #FF70B8 → #FF4A9F | 表情商店 |
| settings | 设置 | #8B8B8B → #6B6B6B | 系统设置 |

## 使用方法

### 图标定义
在组件的 `<script setup>` 中定义 SVG path：

```javascript
const iconPaths = {
  'icon-name': [
    'M path data...',
    'M another path...'
  ]
};
```

### 图标渲染
在模板中使用：

```vue
<div class="icon-container" :data-type="iconType">
  <svg viewBox="0 0 24 24" class="icon-svg">
    <path
      v-for="(path, index) in getIconPaths(iconType)"
      :key="index"
      :d="path"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</div>
```

### 样式定义
```css
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #start, #end);
}

.icon-svg {
  width: 22px;
  height: 22px;
  display: block;
}
```

## 优势

1. **无依赖**: 不需要安装额外的图标库
2. **体积小**: 只加载实际使用的图标
3. **可定制**: 可以轻松修改颜色、大小、描边
4. **性能好**: SVG 内联渲染，无需额外请求
5. **统一风格**: 所有图标视觉风格一致

## 添加新图标

如需添加新图标：

1. 访问 [Lucide Icons](https://lucide.dev/) 或 [Heroicons](https://heroicons.com/)
2. 选择合适的图标
3. 复制 SVG path 数据
4. 添加到对应组件的 `iconPaths` 对象中
5. 在 CSS 中定义背景渐变色

## 图标来源
- 设计风格参考: Lucide Icons, Heroicons
- 许可证: MIT (可自由使用)
- 描边风格: Feather Icons

