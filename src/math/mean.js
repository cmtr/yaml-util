const _ = require("lodash");
const pointer = require("json-pointer");
const common = require("./common");
const config = require("../common/config.json");
const KEY = config.mean.key;

// Action
const meanPath = (obj, path) => _.mean(pointer(obj, path + "/" + KEY))

module.exports = common(KEY, meanPath);