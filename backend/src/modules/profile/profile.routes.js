const { Router } = require('express');
const controller = require('./profile.controller');

const router = Router();

router.get('/', controller.getProfile);

module.exports = router;
