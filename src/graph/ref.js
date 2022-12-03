const pointer = require("json-pointer");

const KEY = "$Ref";

const removeKey = (key) => (path) => path.replace(key, "")

const replace = (obj, targetKey) => {
	const key = removeKey("/" + KEY)(targetKey);
	const sourceKey = removeKey(KEY + " ")(pointer(obj, targetKey));
	const value = pointer(obj, sourceKey);
	return pointer(obj, key, value)
}

const pathPredicate = (value) => {
	if (typeof value !== "string") return false;
	if (value.split("/").pop() !== KEY) return false;
	return true;
}

const valuePredicate = (value) => {
	if (typeof value !== "string") return false;
	const split = value.split(" ");
	if (split.length !== 2) return false;
	if (split[0] !== KEY) return false;
	return true;
}


module.exports = (obj) => {
	Object
		.entries(pointer.dict(obj))
		.forEach(([ path, value ]) => {
			if (pathPredicate(path) || valuePredicate(value)) 
				replace(obj, path);
		});
	return obj;
};