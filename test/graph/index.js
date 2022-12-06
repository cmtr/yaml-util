const { readFileSync } = require("fs");
const yaml = require("js-yaml");
const pointer = require("json-pointer");
const chai = require("chai");
chai.should();

const graph = require("../../src/graph");

describe("graph.yml", () => {

	let model;
	let input;
	let output;
	let updated;

	before(() => {
		model = yaml.load(readFileSync(__dirname + "/../artifacts/graph.yml", { encoding: "utf-8" }));
		input = model.input;
		output = model.output;
		updated = graph.ref(input);
		
	})

	it("Matching each input and output field in file", () => {
		pointer.walk(input, (value, path) => {
			const target = pointer.get(updated, path);
			const expected = pointer.get(output, path);
			target.should.equal(expected, `Target value '${target}' should equal '${expected}' for path '${path}'`);
		});
	});

})