# WeTalk (微信仿制 Demo)

前后端分离的仿微信项目：

- **前端**：Vue 3 + Vite，复刻微信“微信/通讯录/发现/我”四个主界面与会话、朋友圈交互。
- **后端**：Node.js + Express + SQLite，同步返回会话、联系人、发现页、个人页、朋友圈等数据，支持发送消息并实时写入数据库。

images 文件夹提供了界面视觉参考，本项目所有用户昵称均重新设计，未使用示例图片里的名字。

## 环境需求
- Node.js 18+
- npm 9+

## 启动后端（Node + Express）
```bash
cd backend
npm install
npm run dev
```

- 服务默认监听 `http://localhost:3001`
- 首次启动会在 `backend/data/wetalk.db` 中初始化 SQLite 数据库。
- 若需重新初始化模拟数据，可删除该文件后重新运行 `npm run dev`。

## 启动前端（Vue + Vite）
```bash
cd frontend
npm install
npm run dev
```

- Vite 默认运行在 `http://localhost:5173`
- 如后端端口有调整，请在启动前设置：
  ```bash
  export VITE_API_BASE_URL="http://localhost:3001"
  npm run dev
  ```

## 可用 npm 脚本

| 位置 | 指令 | 说明 |
| --- | --- | --- |
| backend | `npm run dev` | 启动 Express 接口服务 |
| frontend | `npm run dev` | 启动前端开发服务器 |
| frontend | `npm run build` | 产出生产构建包 |

## 主要功能
- 会话列表：支持未读数、高亮置顶、静音、最近消息等信息展示
- 会话详情：文本消息往返、发送实时写库更新
- 通讯录：按字母分组的联系人、常用入口
- 发现页：朋友圈、直播、小游戏等入口及红点提示
- 朋友圈：半透明遮罩、封面、图文列表展示
- “我”页面：个人卡片、快捷入口、菜单分组

## 后端分层结构
- `src/app.js`：Express 应用装配，统一中间件与错误捕获
- `src/routes`：REST 路由聚合（`/chats`、`/contacts`、`/discover`、`/profile`、`/moments`、`/status`）
- `src/modules/**`：按领域划分的 Controller → Service → Repository 三级结构
- `src/database`：SQLite 连接、建表迁移与种子数据管理
- `src/config`：环境变量与路径配置
