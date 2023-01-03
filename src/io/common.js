/**
 * 
 * 
 * @author Harald Blikø
 */

const { readFileSync } = require("fs");
const _ = require("lodash");
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
	encoding: "utf-8",
	recursive: true
};

module.exports = (key, argLength, transform, overrideOptions={}) => 
	(rootDirectory, userOptions={}) => (obj) => {
		const options =  { 
			...defaultOptions, 
			...overrideOptions, 
			...userOptions 
		};

		const modifyObject = replaceIf(
				keyPredicate(key, argLength), 
				replace(key, rootDirectory, transform, options)
			);

		let result = obj;
		let previous;
		let counter = 0;
		do {
			previous = _.cloneDeep(result);
			result = modifyObject(result);
			
			if (counter++ > 10) break;
		} while (options.recursive && !_.isEqual(result, previous))

		return result;
	}