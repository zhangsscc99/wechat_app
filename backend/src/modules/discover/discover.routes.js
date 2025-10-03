const { Router } = require('express');
const controller = require('./discover.controller');

const router = Router();

router.get('/', controller.listDiscover);

module.exports = router;
