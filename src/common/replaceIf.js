/**
 * Mutable Function
 * 
 * Graph traversal and replacement
 * 
 * @param isActionable - Predicate Function 
 * 		@param path 
 * 		@param value
 * @param replace - Action Function effectuating change
 * 		@param obj - root
 * 		@param path
 *
 * @param obj - obj - root
 * 
 * @author Harald Blikø
 */

const pointer = require("json-pointer");


module.exports = (isActionable, replace) => (obj) => {
	Object
		.entries(pointer.dict(obj))
		.forEach(([ path, value ]) => {
			if (isActionable(path, value)) replace(obj, path);
		});
	return obj;
}