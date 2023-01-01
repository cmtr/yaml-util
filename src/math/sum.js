/*


@author: Harald Blikø

*/

const _ = require("lodash");
const pointer = require("json-pointer");
const common = require("./common");


// Get Key from Config File
const config = require("../common/config.json");
const KEY = config.sum.key;


// Action
const sumPath = (obj, path) => 
	_.sum(pointer(obj, path + "/" + KEY))


module.exports = common(KEY, sumPath);