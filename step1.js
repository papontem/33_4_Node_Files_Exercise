const process = require('node:process');
const fs = require('fs');

// exit listener
process.on('exit', function (code) {
    console.log(`EXITING WITH CODE: ${code}`)
})

// console.log(process.argv);
// for (let arg of process.argv) {
//     console.log(arg)
// }

// allowing for the passing of a file path to the execution of our js when user uses
// $ node step1.js one.txt
let filePath = process.argv[2]
console.log("File Path:",filePath);

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
          console.error(`ERROR when trying to read ${path}:\n`, error);
          process.kill(1)
        }
        console.log("DATA:\n", data)
        process.exit(0)
      })
}

if (filePath){
    cat(filePath)
}else{
    process.exit(0)
}