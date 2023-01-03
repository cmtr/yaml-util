/**
 * Math Libary for configuring Math Operations within JSON or YAML files. This in
 * order to have dynamically defined variables.
 * 
 * NOTE:
 * For Math to be calculated correctly the order of execution needst to follow 
 * the order of operations, which is used throughout mathematics, science, 
 * technology and many computer programming languages, is expressed here:
 * 
 * 1. exponentiation and root extraction
 * 2. multiplication and division
 * 3. addition and subtraction
 * 
 * Reference:
 * - https://en.wikipedia.org/wiki/Order_of_operations
 * 
 * All Operations within this libary is Mutable.
 * 
 * @author: Harald Blikø
 * 
 * */


const product = require("./product");
const sum = require("./sum");
const mean = require("./mean");
const power = require("./power");
const squareRoot = require("./square-root");


const methods = [
	// exponentiation and root exrtaction
	power,
	squareRoot,
	// multiplication and division
	product,
	// addition and subtractions
	sum,
	// statistics
	mean
];

module.exports = (obj) => {
	methods.forEach((method) => method(obj));
	return obj;
}