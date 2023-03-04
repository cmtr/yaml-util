const fs = require("fs")
const Path = require("path"); 

const cwd = process.cwd();

// Limitations:
// - It is not necessary to check if the actual path does exist
module.exports = (source=cwd) => {
	if (!fs.existsSync(source)) throw new Error(`Source path "${source}" does not exist`);

	const sourceDirectoryPath = fs.lstatSync(source).isDirectory()
		? source
		: Path.parse(source).dir;

	return (target) => {
		const targetAbsolutePath = Path.resolve(sourceDirectoryPath, target);
		if (!fs.existsSync(targetAbsolutePath)) throw new Error(`target path "${targetAbsolutePath}" does not exist`);
		return targetAbsolutePath
	}
} ;