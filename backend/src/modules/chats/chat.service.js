const { BadRequestError, NotFoundError } = require('../../utils/errors');
const repository = require('./chat.repository');

function listChats() {
  return repository.findAll();
}

function getChatDetail(chatId) {
  const chat = repository.findById(chatId);
  if (!chat) {
    throw new NotFoundError('会话不存在');
  }

  const messages = repository.findMessages(chatId);
  const participants = new Set(chat.participants || []);

  if (chat.type !== 'group') {
    participants.add(chat.name);
  }

  return {
    ...chat,
    participants: Array.from(participants),
    messages
  };
}

function sendMessage(chatId, { sender, senderId, text }) {
  if (!text || !text.trim()) {
    throw new BadRequestError('消息正文不能为空');
  }

  const chat = repository.findById(chatId);
  if (!chat) {
    throw new NotFoundError('会话不存在');
  }

  const message = repository.saveMessage(chatId, {
    sender,
    senderId,
    text: text.trim()
  });

  return message;
}

module.exports = {
  listChats,
  getChatDetail,
  sendMessage
};
