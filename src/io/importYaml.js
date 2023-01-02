/**
 * 
 * 
 * @author Harald Blikø
 */

const yaml = require("js-yaml");
const common = require("./common");
const config = require("../common/config");
const KEY = config.yamlFile.key;

const transform = yaml.load;

module.exports = common(KEY, 1, transform);