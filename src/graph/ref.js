const pointer = require("json-pointer");

const KEY = "$Ref";

const removeKey = (key) => (path) => path.replace(key, "")

const replace = (obj, targetKey) => {
	const key = removeKey("/" + KEY)(targetKey);
	const sourceKey = removeKey(KEY + " ")(pointer(obj, targetKey));
	const value = pointer(obj, sourceKey);
	return pointer(obj, key, value)
}

// Reference Key as part of Path
const pathPredicate = (path, value) => {
	if (typeof path !== "string") return false;
	if (path.split("/").pop() !== KEY) return false;
	if (typeof value !== "string") return false;
	if (value.split(" ").length !== 1) return false;
	return true;
}

// Reference Key as part of the Value
const valuePredicate = (value) => {
	if (typeof value !== "string") return false;
	const split = value.split(" ");
	if (split.length !== 2) return false;
	if (split[0] !== KEY) return false;
	return true;
}

const isActionable = (path, value) => {
	const isPath = pathPredicate(path, value);
	const isValue = valuePredicate(value);
	return	(isPath || isValue) && !(isPath && isValue);
}

/**
 * Mutable function
 */
module.exports = (obj) => {
	Object
		.entries(pointer.dict(obj))
		.forEach(([ path, value ]) => {
			if (isActionable(path, value)) replace(obj, path);
		});
	return obj;
};