const pointer = require("json-pointer");
const common = require("./common");
const config = require("../common/config.json");
const KEY = config.power.key;


// Action
const power = (obj, path) => {
	const source = pointer(obj, path + "/" + KEY);
	return Math.pow(source[0], source[1]);
}

module.exports = common(KEY, power);