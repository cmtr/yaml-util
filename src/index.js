const common = require("./common");
const date = require("./date");
const graph = require("./graph");
const math = require("./math");
const io = require("./io");

module.exports = {
	...common,
	...date,
	...graph,
	...math,
	...io
};