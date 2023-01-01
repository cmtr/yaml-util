const { readFileSync } = require("fs");
const util = require("../../src/index");
const yaml = require("js-yaml");
const pointer = require("json-pointer");
const chai = require("chai");
chai.should();

const testArtifacts = [
	{
		name: "Graph - Ref",
		path: __dirname + "/../artifacts/graph.yml",
		func: util.ref		
	}
]

describe("Test of Artifacts", () => {

	testArtifacts.forEach(({ name, path, func }) => {

		const model = yaml.load(readFileSync(path, { encoding: "utf-8" }));
		const input = model.input;
		const output = model.output;
		const updated = func(input);

		describe("Test of: " + name, () => {

			Object.entries(pointer.dict(input)).forEach(([ path, value ]) => {

				it(`Testing path '${path}' with original value '${value}'`, () => {
					const target = pointer.get(updated, path);
					const expected = pointer.get(output, path);
					target.should.equal(expected, `Target value '${target}' should equal '${expected}' for path '${path}'`);
				});

			});

		});

	});

});