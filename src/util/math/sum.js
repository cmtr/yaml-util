const _ = require("lodash");
const pointer = require("json-pointer");
const common = require("./common");

const KEY = "$Sum";

// Action
const sumPath = (obj, path) => _.sum(pointer(obj, path + "/" + KEY))

module.exports = common(KEY, sumPath);