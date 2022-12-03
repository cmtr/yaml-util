const pointer = require("json-pointer");
const common = require("./common");

const KEY = "$Sqrt";

// Action
const power = (obj, path) => {
	const source = pointer(obj, path + "/" + KEY);
	return Math.sqrt(source[0]);
}

module.exports = common(KEY, power);