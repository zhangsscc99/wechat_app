const repository = require('./discover.repository');

function listDiscoverItems() {
  return repository.findAll();
}

module.exports = {
  listDiscoverItems
};
