/**
 * 
 * 
 * @author Harald Blikø
 */

const common = require("./common");
const config = require("../common/config");
const KEY = config.file.key;

const transform = (obj) => obj; 

module.exports = common(KEY, 1, transform);