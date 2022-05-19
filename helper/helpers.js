const fs = require('fs').promises;
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const getTalker = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeTalker = async (talker) => {
  await fs.writeFile('./talker.json', JSON.stringify(talker, null, 2)); 
};

module.exports = {
  getTalker,
  generateToken,
  writeTalker,
};
