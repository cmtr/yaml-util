const common = require("./common");
const config = require("../common/config");
const KEY = config.jsonFile.key;

const transform = JSON.parse;

module.exports = common(KEY, 1, transform);