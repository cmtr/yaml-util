const fs = require("fs")
const Path = require("path"); 

const cwd = process.cwd();

/**
 * Given a optional source file or directory as basis and 
 * a relative path to a target file the function will 
 * return the absolute path to the target file
 * 
 * The source is defaulted to current working directory when not present.
 * 
 * @param source file path - defaulted to current working directory
 * @param target relative file path
 * @return target file absolute path as STRING
 * 
 * @author Harald Blikø
 */
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