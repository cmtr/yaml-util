const { readFileSync } = require("fs");
// const yaml = require("js-yaml");
const { replaceIf, keyPredicate } = require("../common");
const config = require("../common/config");
const KEY = config.file.key;

// Preducate
const isActionable = keyPredicate(KEY, 1);

// Action

const removeKey = (key) => (value) => value.replace(key, "")

const replace = (obj, path, value) => {
	console.log(obj, path, value)
}

// Defaults
const defaultOptions = {
	encoding: "utf-8"
};

module.exports = (rootDirectory, opt={}) => replaceIf();