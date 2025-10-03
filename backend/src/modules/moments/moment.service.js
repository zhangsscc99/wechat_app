const repository = require('./moment.repository');

function listMoments() {
  return repository.findAll();
}

module.exports = {
  listMoments
};
