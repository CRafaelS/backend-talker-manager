const { validateEmail, validatePassword } = require('./validateLogin');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const { validateTalkWatched, validateTalkRate, validateTalk } = require('./validateTalk');

module.exports = { 
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalkRate,
  validateTalkWatched,
  validateTalk,
};