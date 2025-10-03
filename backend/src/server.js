const { PORT } = require('./config/env');
const app = require('./app');

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`WeTalk backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
