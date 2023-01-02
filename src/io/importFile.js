const { readFileSync } = require("fs");
const pointer = require("json-pointer");
const { 
	replaceIf, 
	keyPredicate, 
	removeKey 
} = require("../common");
const config = require("../common/config");
const KEY = config.file.key;

// Preducate
const isActionable = keyPredicate(KEY, 1);

// Action
const replace = (rootDirectory, options) => (obj, path, value) => {
	const key = removeKey("/" + KEY)(path);
	const filePath = rootDirectory + removeKey(KEY)(value);
	const payload = readFileSync(filePath, options)
	return pointer(obj, key, payload);
}

// Defaults
const defaultOptions = {
	encoding: "utf-8"
};

module.exports = (rootDirectory, opt={}) => 
	replaceIf(isActionable, replace(rootDirectory, { ...defaultOptions, ...opt }));