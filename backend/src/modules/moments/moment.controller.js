const momentService = require('./moment.service');

function listMoments(_req, res, next) {
  try {
    const moments = momentService.listMoments();
    res.json(moments);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listMoments
};
