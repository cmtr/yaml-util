const { readFileSync } = require("fs");
const util = require("../../src/index");
const yaml = require("js-yaml");
const pointer = require("json-pointer");
const chai = require("chai");
chai.should();

const artifactsRootDirectory = __dirname + "/../artifacts/"

const testArtifacts = [
	{
		name: "Graph - Ref",
		path: artifactsRootDirectory + "graph.yml",
		func: util.ref,
		description: "Something here "	
	},
	{
		name: "IO - Import File Content",
		path: artifactsRootDirectory + "file.yml",
		func: util.file(artifactsRootDirectory),
		description: "Something here "	
	},
	{
		name: "IO - Import Json Content",
		path: artifactsRootDirectory + "jsonFile.yml",
		func: util.jsonFile(artifactsRootDirectory),
		description: "Something here "
	},
	{
		name: "IO - Import Yaml Content",
		path: artifactsRootDirectory + "yamlFile.yml",
		func: util.yamlFile(artifactsRootDirectory),
		description: "Something here "
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