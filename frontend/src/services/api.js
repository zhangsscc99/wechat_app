const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || '请求失败');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getChats() {
  return request('/api/chats');
}

export function getChat(chatId) {
  return request(`/api/chats/${chatId}`);
}

export function postChatMessage(chatId, text) {
  return request(`/api/chats/${chatId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text })
  });
}

export function getContacts() {
  return request('/api/contacts');
}

export function getDiscover() {
  return request('/api/discover');
}

export function getProfile() {
  return request('/api/profile');
}

export function getMoments() {
  return request('/api/moments');
}
