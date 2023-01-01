/**
 * 
 * @author Harald Blikø
 */
module.exports = (key) => (value) => value
	.replace(key, "")
	.trim();