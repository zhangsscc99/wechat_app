const { Router } = require('express');
const controller = require('./contact.controller');

const router = Router();

router.get('/', controller.listContacts);

module.exports = router;
