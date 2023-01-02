/*

Generic method to identify the Key used to trigger a math operations
and effectuate the corresponing action.

@author: Harald Blikø
*/

const _ = require("lodash");
const pointer = require("json-pointer");

const predicate = (key) => (value) => {
	if (typeof value !== "string") return false;
	if (!value.includes(key)) return false
	return true;
}

const getPath = (key) => (value) => value.split("/" + key)[0];

module.exports = (key, action) => (obj) => { 
	_.chain(pointer.dict(obj))
		.keys()
		.filter(predicate(key))		
		.map(getPath(key))
		.uniqWith(_.isEqual)
		.value()
		.forEach((path) => pointer(obj, path, action(obj, path)));

	return obj;
};