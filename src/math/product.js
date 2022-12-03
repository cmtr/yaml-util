const _ = require("lodash");
const pointer = require("json-pointer");
const common = require("./common");

const KEY = "$Product";

// Action
const productPath = (obj, path) => {
	const arr = pointer(obj, path + "/" + KEY);
	if (arr.length === 0) return 0;
	return arr.reduce((acc, curr) => acc * curr, 1);
}

module.exports = common(KEY, productPath);