const _ = require("lodash");
const pointer = require("json-pointer");
const common = require("./common");

const KEY = "$Mean";

// Action
const meanPath = (obj, path) => _.mean(pointer(obj, path + "/" + KEY))

module.exports = common(KEY, meanPath);