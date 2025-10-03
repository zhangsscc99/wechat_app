const express = require('express');
const cors = require('cors');
const { bootstrapDatabase } = require('./database/bootstrap');
const { BaseHttpError } = require('./utils/errors');

// 先初始化数据库，再加载路由（路由会加载 repository，repository 中有 prepare 语句）
bootstrapDatabase();

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ message: '资源未找到', path: req.originalUrl });
});

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const status = error instanceof BaseHttpError ? error.status : 500;
  const payload = {
    message: error.message || '服务器异常'
  };

  if (error.details) {
    payload.details = error.details;
  }

  if (process.env.NODE_ENV !== 'production' && status >= 500) {
    payload.stack = error.stack;
  }

  // eslint-disable-next-line no-console
  console.error(error);

  res.status(status).json(payload);
});

module.exports = app;
