/**
 * 
 * @author Harald Blikø
 */


const { readFileSync } = require("fs");
const pointer = require("json-pointer");
const { 
	replaceIf, 
	keyPredicate, 
	removeKey 
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
	encoding: "utf-8"
};

module.exports = (key, argLength, transform, overrideOptions={}) => 
	(rootDirectory, options={}) => 
		replaceIf(
			keyPredicate(key, argLength), 
			replace(key, rootDirectory, transform, { 
				...defaultOptions, 
				...overrideOptions, 
				...options 
			})
		);