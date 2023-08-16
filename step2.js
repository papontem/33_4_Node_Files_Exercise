const process = require("node:process");
const fs = require("fs");
const axios = require("axios");
const url = require("node:url");
const path = require("node:path");

// exit listener
process.on('exit', function (code) {
    console.log(`EXITING WITH CODE: ${code}`)
})



// Read local resource (file)
async function cat(path) {
    return new Promise(async function(resolve, reject){
        try {
            const data = await fs.promises.readFile(path, 'utf8');
            resolve(data);
        } catch (error) {
            console.error(`ERROR when trying to read ${path}:\n`, error);
            reject(error)
        }

    });

}

// get online resource (URL)
async function webCat(url) {
    return new Promise(async function(resolve, reject){
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
async function getReadData(dest) {
    if (isURL(dest)) {
        // console.log("USING AXIOS webcat");
        try {
            const data = await webCat(dest);
            console.log(data);
        } catch (error) {
            process.exit(1);
        }
        
    } else if (isPATH(dest)) {
        console.log("USING FILE SYSTEM cat");
        
        try {
            const data = await cat(dest);
            console.log(data);
        } catch (error) {
            process.exit(1);
        }
    } else {
        console.error('ERROR: Destination sent was not a valid path or URL');
        process.exit(1);
    }
}

// console.log(process.argv);
// for (let arg of process.argv) {
//     console.log(arg)
// }

// Get destination from process.argv
const dest = process.argv[2];
// console.log(`Destination (path/url): ${dest}`);

getReadData(dest);
