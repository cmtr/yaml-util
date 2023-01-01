const { readFileSync } = require("fs");
const yaml = require("js-yaml");
const config = require("../common/config");
const KEY = config.file.key;

// Preducate


const pathPredicate = (path, value) => {

};

const valuePredicate = (value) => {

};

const isActionable = (path, value) => {
	const isPath = pathPredicate(path, value);
	const isValue = valuePredicate(value);
	return	(isPath || isValue) && !(isPath && isValue);
};

// Action

const replace = (obj, targetKey) => {
	
}

// Defaults
const defaultOptions = {
	encoding: "utf-8"
};

module.exports = (rootDirectory, opt={}) => (obj) => {

}