const discoverService = require('./discover.service');

function listDiscover(_req, res, next) {
  try {
    const items = discoverService.listDiscoverItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listDiscover
};
