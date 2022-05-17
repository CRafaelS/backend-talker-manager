const fs = require('fs').promises;

const getTalker = async () => JSON.parse(await fs.readFile('./talker.json'));

module.exports = {
  getTalker,
};
