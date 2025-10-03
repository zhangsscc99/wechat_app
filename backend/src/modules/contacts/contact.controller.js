const contactService = require('./contact.service');

function listContacts(_req, res, next) {
  try {
    const payload = contactService.getContacts();
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts
};
