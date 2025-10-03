const { Router } = require('express');
const controller = require('./moment.controller');

const router = Router();

router.get('/', controller.listMoments);

module.exports = router;
