const fs = require('fs').promises;
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const getTalker = async () => JSON.parse(await fs.readFile('./talker.json'));

module.exports = {
  getTalker,
  generateToken,
};
