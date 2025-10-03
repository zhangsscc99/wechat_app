const repository = require('./contact.repository');

function getContacts() {
  return repository.findAll();
}

module.exports = {
  getContacts
};
