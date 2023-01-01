const { replaceIf, keyPredicate } = require("../common");
const pointer = require("json-pointer");
const config = require("../common/config")
const KEY = config.ref.key;

// Pradicate
const isActionable = keyPredicate(KEY, 1);


// Action
const removeKey = (key) => (path) => path.replace(key, "")

const replace = (obj, targetKey) => {
	const key = removeKey("/" + KEY)(targetKey);
	const sourceKey = removeKey(KEY + " ")(pointer(obj, targetKey));
	const value = pointer(obj, sourceKey);
	return pointer(obj, key, value)
}

/**
 * Mutable function
 */
module.exports = replaceIf(isActionable, replace);