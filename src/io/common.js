/**
 * 
 * The objective is to remvoe the rootDirectory variable from the first
 * part of the function. We want to have a moving reference point that is
 * at any time fixed to the location of the object being processed.
 * 
 * @author Harald Blikø
 */
const Path = require("path");
const { readFileSync } = require("fs");
const _ = require("lodash");
const pointer = require("json-pointer");
const { 
	replaceIf, 
	keyPredicate, 
	removeKey,
	resolvePath
} = require("../common");


// Action
const replace = (KEY, rootDirectory, transform, options) => 
	(obj, path, value) => {
		const key = removeKey("/" + KEY)(path);
		const filePath = rootDirectory + removeKey(KEY)(value);
		const payload = readFileSync(filePath, options);
		const transformed = transform(payload);
		return pointer(obj, key, transformed);
	};


// Defaults
const defaultOptions = {
	encoding: "utf-8",
	recursive: true
};

const common = (key, argLength, transform, overrideOptions={}) => 
	(rootDirectory, userOptions={}) => (obj) => {
		
		// Allways have preferenciality to the configurations towards the end
		const options =  { 
			...defaultOptions, 
			...overrideOptions, 
			...userOptions 
		};

		const modifyObject = replaceIf(
				keyPredicate(key, argLength), 
				replace(key, rootDirectory, transform, options)
			);

		// Iteratively import files 
		// If recursive, also those referenced in imported files
		let result = obj;
		let previous;
		do {
			previous = _.cloneDeep(result);
			result = modifyObject(result);
		} while (options.recursive && !_.isEqual(result, previous))

		return result;
	}

module.exports = common;