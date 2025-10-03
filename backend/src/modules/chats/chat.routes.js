const { Router } = require('express');
const controller = require('./chat.controller');

const router = Router();

router.get('/', controller.listChats);
router.get('/:chatId', controller.getChat);
router.post('/:chatId/messages', controller.sendMessage);

module.exports = router;
