/**
 * Removes the key value from the string including empty space
 * 
 * @author Harald Blikø
 */

module.exports = (key) => (value) => value
	.replace(key, "")
	.trim();