const chai = require("chai");
chai.should();
const { readFileSync } = require("fs");
const yaml = require("js-yaml");
const pointer = require("json-pointer");
const util = require("../../src/index");

// Test Data

const testArtifacts = [
	{
		name: "IO - Import File",
		func: util.importFile(),
		inputPath: __dirname + "/../artifacts/yaml-file-v2-input.yml",
		outputPath: __dirname + "/../artifacts/yaml-file-v2-output.yml",
		description: "Yaml Content With Relative Path Support"
	}
];

describe("Test of Artifacts", () => {

	testArtifacts.forEach(({ name, inputPath, outputPath, func, options={} }) => {

		const input = yaml.load(readFileSync(inputPath, { encoding: "utf-8", ...options }));
		const output = yaml.load(readFileSync(outputPath, { encoding: "utf-8", ...options }));
		const updated = func(inputPath);

		describe("Test of: " + name, () => {

			Object.entries(pointer.dict(output)).forEach(([ path, value ]) => {

				it(`Testing path '${path}' with original value '${value}'`, () => {
					const target = pointer.get(updated, path);
					const expected = pointer.get(output, path);
					target.should.equal(expected, `Target value '${target}' should equal '${expected}' for path '${path}'`);
				});

			});

		});

	});

});