const pointer = require("json-pointer");
const common = require("./common");
const config = require("../common/config.json");
const KEY = config.sqrt.key;

// Action
const power = (obj, path) => {
	const source = pointer(obj, path + "/" + KEY);
	return Math.sqrt(source[0]);
}

module.exports = common(KEY, power);