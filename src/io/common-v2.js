/**
 * 
 * The objective is to remvoe the rootDirectory variable from the first
 * part of the function. We want to have a moving reference point that is
 * at any time fixed to the location of the object being processed.
 * 
 * @author Harald Blikø
 */
const { readFileSync } = require("fs");
const Path = require("path");
const _ = require("lodash");
const pointer = require("json-pointer");
const yaml = require("js-yaml");

const { 
	replaceIf, 
	keyPredicate, 
	removeKey
} = require("../common");

const config = require("../common/config");


// Defaults
const defaultOptions = {
	encoding: "utf-8",
	recursive: true
};


const transformation = [
	{
		key: config.file.key,
		argLength: 1,
		transformation: (obj) => obj,
		options: { },
		recursive: false
	}, 
	{
		key: config.yamlFile.key,
		argLength: 1,
		transformation: yaml.load,
		options: { },
		recursive: true
	},
	{
		key: config.jsonFile.key,
		argLength: 1,
		transformation: JSON.parse,
		options: { },
		recursive: true
	}
]


const common = (sourceFilePath) => (relativePath, userOptions={}) => {
		
		const absolutePath = Path.resolve(sourceFilePath, relativePath);
		console.log(absolutePath);

		// Allways have preferenciality to the configurations towards the end
		const options =  { 
			...defaultOptions, 
			...userOptions 
		}; 


		return {

		}
	}

module.exports = common;