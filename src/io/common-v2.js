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
const pointer = require("json-pointer");
const yaml = require("js-yaml");

const { 
	replaceIf, 
	keyPredicate, 
	removeKey, 
	resolvePath
} = require("../common");

const config = require("../common/config");


// Defaults
const defaultOptions = {
	encoding: "utf-8"
};

const KEY = "$File";

const isActionable = keyPredicate(KEY, 1)

const replace = (sourceFilePath, options) => (obj, path, value) => {
	const targetFilePath = removeKey(KEY)(value);
	const key = removeKey("/" + KEY)(path);
	const payload = common(sourceFilePath)(targetFilePath, options);
	return pointer(obj, key, payload);
}

// Modifies the js-object
//
// File Path of the original file is needed in order to use relative paths 
// in the configuration files
const modify = (payload, filePath, options) => 
	replaceIf(isActionable, replace(filePath, options))(payload);

// Transform the raw file data to js-object based on file-extension naming
const transform = (payload, filePath, options) => {
	const fileExtension = Path.extname(filePath).toLowerCase()

	switch (fileExtension) {
	case ".yml":
	case ".yaml":
		// recursive: true
		return yaml.load(payload);
		// recursive: true
	case ".json":
		return JSON.parse(payload);
	default:
		// recursive: false
		return payload;
	}

}

const common = (sourceFilePath) => (targetFilePath, userOptions={}) => {
	// Options
	const options =  { 
		...defaultOptions, 
		...userOptions 
	}; 
	
	// Extract
	const targetAbsolutePath = resolvePath(sourceFilePath)(targetFilePath);
	const payload = readFileSync(targetAbsolutePath, options)

	// Transform
	const transformed = transform(payload, targetAbsolutePath, options);
	const modified = modify(transformed, targetAbsolutePath, options);

	// Load
	return modified;
}

module.exports = common;