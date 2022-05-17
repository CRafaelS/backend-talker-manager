const fs = require('fs');

const getTalker = async () => JSON.parse(fs.readFileSync('./talker.json'));

module.exports = {
  getTalker,
};
