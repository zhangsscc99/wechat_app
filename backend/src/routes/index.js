const { Router } = require('express');

const chatRoutes = require('../modules/chats/chat.routes');
const contactRoutes = require('../modules/contacts/contact.routes');
const discoverRoutes = require('../modules/discover/discover.routes');
const profileRoutes = require('../modules/profile/profile.routes');
const momentRoutes = require('../modules/moments/moment.routes');
const statusRoutes = require('./status.routes');

const router = Router();

router.use('/status', statusRoutes);
router.use('/chats', chatRoutes);
router.use('/contacts', contactRoutes);
router.use('/discover', discoverRoutes);
router.use('/profile', profileRoutes);
router.use('/moments', momentRoutes);

module.exports = router;
