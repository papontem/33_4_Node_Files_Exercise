const process = require("node:process");
const fs = require("fs");
const axios = require("axios");
const url = require("node:url");
const path = require("node:path");

// exit listener
process.on("exit", function (code) {
	console.log(`EXITING WITH CODE: ${code}`);
});

// console.log(process.argv);
// for (let arg of process.argv) {
// 	console.log(arg);
// }

let source;
let outputFilePath;

// Get source and optional output if --out is in from process.argv
if (process.argv[2] == "--out") {
    outputFilePath = process.argv[3];
    source = process.argv[4];
    console.log("source:",source);
    console.log("outputFilePath:",outputFilePath);
} else {
    source = process.argv[2];
    console.log("source:",source);
}

// Read local resource (file)
async function cat(path) {
    return new Promise(async function (resolve, reject) {
		try {
            const data = await fs.promises.readFile(path, "utf8");
			resolve(data);
		} catch (error) {
            console.error(`ERROR when trying to read ${path}:\n`, error);
			reject(error);
		}
	});
}

// get online resource (URL)
async function webCat(url) {
	return new Promise(async function (resolve, reject) {
		try {
			const response = await axios.get(url);
			resolve(response.data);
		} catch (error) {
            console.error(`ERROR when trying to fetch ${url}:\n`, error);
			reject(error);
		}
	});
}

// Helpful validation functions

// validate if input is a URL
function isURL(input) {
    try {
        new URL(input);
		return true;
	} catch (error) {
        // console.error(`The input: ${input} was not a valid URL: ${error}`);
		return false;
	}
}

// validate if input is a file path
function isPATH(input) {
    try {
        path.parse(input);
		return true;
	} catch (error) {
        // console.error(`The input: ${input} was not a valid path string: ${error}`);
		return false;
	}
}

// function to determine if we should get the url or read the file at path based on input
async function getReadWriteData(source, outputFilePath = null) {
    if (isURL(source)) {
        // console.log("USING AXIOS webcat");
		try {
            const data = await webCat(source);
			console.log(data);

            // write to file if outputFilePath is defined
            if(outputFilePath && isPATH(outputFilePath)){
                writeToFile(outputFilePath,data)
            }

		} catch (error) {
            console.error(`ERROR: ${error}`)
			process.exit(1);
		}
	} else if (isPATH(source)) {
		// console.log("USING FILE SYSTEM cat");
        
		try {
			const data = await cat(source);
			console.log(data);

            // write to file if outputFilePath is defined
            if(outputFilePath && isPATH(outputFilePath)){
                writeToFile(outputFilePath,data)
            }

		} catch (error) {
            console.error(`ERROR: ${error}`)
            process.exit(1);

		}
	} else {
        console.error("ERROR: Destination sent was not a valid path or URL");
		process.exit(1);
	}
}

// function that will take output file path and overwrite it with desired data  
function writeToFile(outputFilePath, data) {
    console.log("OutputFilePath:", outputFilePath);
    try {
        fs.writeFileSync(outputFilePath, data);
        console.log('Successfully wrote to file!');
    } catch (error) {
        console.error(`ERROR: Failed to write to file: ${error}`)
        process.exit(1);
    }
    
}

getReadWriteData(source,outputFilePath);