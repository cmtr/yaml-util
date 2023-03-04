
/**
 * 
 * 
 * @author Harald Blikø
 */

const yaml = require("js-yaml");
const common = require("./common-v2");
const config = require("../common/config");
const KEY = config.yamlFile.key;

const transform = yaml.load;

module.exports = common;