const pointer = require("json-pointer");

const { 
	replaceIf, 
	keyPredicate, 
	removeKey
} = require("../common");

const config = require("../common/config")
const KEY = config.ref.key;

// Pradicate
const isActionable = keyPredicate(KEY, 1);


// Action
const replace = (obj, path, value) => {
	const key = removeKey("/" + KEY)(path);
	const sourceKey = removeKey(KEY + " ")(value);
	const payload = pointer(obj, sourceKey);
	return pointer(obj, key, payload)
}

/**
 * Mutable function
 */
module.exports = replaceIf(isActionable, replace);