const chatService = require('./chat.service');
const profileService = require('../profile/profile.service');

function listChats(_req, res, next) {
  try {
    const chats = chatService.listChats();
    res.json(chats);
  } catch (error) {
    next(error);
  }
}

function getChat(req, res, next) {
  try {
    const chat = chatService.getChatDetail(req.params.chatId);
    res.json(chat);
  } catch (error) {
    next(error);
  }
}

function sendMessage(req, res, next) {
  try {
    const currentUser = profileService.getCurrentUser();
    const message = chatService.sendMessage(req.params.chatId, {
      sender: currentUser.name,
      senderId: currentUser.id,
      text: req.body?.text
    });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listChats,
  getChat,
  sendMessage
};
