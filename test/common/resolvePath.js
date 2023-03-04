const Path = require("path");
const { resolvePath } = require("../../src");
const chai = require("chai");
chai.should();

const testExecutionRootPath = process.cwd();
const testDirectory = Path.resolve(__dirname, "..");
const sourceDirectory = Path.resolve(testDirectory, "..");

describe("Common - Resolve Path", () => {

	describe("Given a soureFilePath with reference from", () => {
		const path = "/artifacts/file.yml"
		const relativePath = ".." + path;

		it("file in this folder", () => {
			console.log(sourceDirectory)
			resolvePath(__dirname + "/resolvePath.js")(relativePath).should.equal(testDirectory + path);
		});

		it("this folder", () => {
			resolvePath(__dirname)(relativePath).should.equal(testDirectory + path);
		});


		it("void", () => {
			resolvePath()("./test" + path).should.equal(testDirectory + path);
		});

		it("a absolute path for the relativePath parameter", () => {
			resolvePath()(__dirname + "/resolvePath.js").should.equal(__dirname + "/resolvePath.js");
		})

	});
});