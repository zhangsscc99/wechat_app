const { Router } = require('express');
const dayjs = require('dayjs');
const chatService = require('../modules/chats/chat.service');
const contactService = require('../modules/contacts/contact.service');
const discoverService = require('../modules/discover/discover.service');
const profileService = require('../modules/profile/profile.service');
const momentService = require('../modules/moments/moment.service');

const router = Router();

router.get('/', (_req, res, next) => {
  try {
    const chats = chatService.listChats();
    const contacts = contactService.getContacts();
    const discover = discoverService.listDiscoverItems();
    const profile = profileService.getProfile();
    const moments = momentService.listMoments();

    res.json({
      status: 'ok',
      timestamp: dayjs().toISOString(),
      counts: {
        chats: chats.length,
        contacts: contacts.sections.reduce((acc, section) => acc + section.contacts.length, 0),
        discover: discover.length,
        moments: moments.length
      },
      user: profile?.user?.name || null
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
