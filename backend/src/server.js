const { PORT } = require('./config/env');
const app = require('./app');

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  // 不要立即退出，让服务器继续运行
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  // 不要立即退出，让服务器继续运行
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭服务器...');
  process.exit(0);
});

if (require.main === module) {
  const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`WeTalk backend listening on http://localhost:${PORT}`);
  });

  // 处理服务器错误
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`端口 ${PORT} 已被占用，请尝试使用其他端口`);
    } else {
      console.error('服务器错误:', error);
    }
    process.exit(1);
  });
}

module.exports = app;
