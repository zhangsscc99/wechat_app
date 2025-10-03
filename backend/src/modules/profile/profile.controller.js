const profileService = require('./profile.service');

function getProfile(_req, res, next) {
  try {
    const profile = profileService.getProfile();
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile
};
