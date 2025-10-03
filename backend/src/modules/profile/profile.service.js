const repository = require('./profile.repository');

function getProfile() {
  return repository.findProfile();
}

function getCurrentUser() {
  const profile = repository.findProfile();
  if (profile?.user) {
    return profile.user;
  }

  return {
    id: 'user-self',
    name: 'WeTalk 用户'
  };
}

module.exports = {
  getProfile,
  getCurrentUser
};
