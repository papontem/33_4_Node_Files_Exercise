# 33_4_Node_Files_Exercise
## Public repo of exercise for unit 33.4: Node Intro Files Exercise
We will complete the following tasks using asynchronous functions and await promises in JavaScript:

## How To Run
- Download a clone of this repo
- Navigate to the repository's directory using your terminal.
- Install the projects dependencies with the following command:
```
$ npm install
```
- to start the Node.js REPL (Read-Eval-Print Loop), you simply use the command:
```
$ node
```
- then you can call node to run any of the step.js scripts to read resources:
  - step1 can read and log to console local files:
```
$ node step1.js one.txt
This is a text file named one.txt .
```
  -
      - step2 and step3 can also read html from passed in urls:
```
$ node step2.js one.txt
This is a text file named one.txt .

$ node step2.js http://google.com
<!doctype html><html ...

$ node step3.js one.txt
This is a text file named one.txt .

$ node step3.js http://google.com
<!doctype html><html ...
```
  -
      - while step3 is the only one that allows the use of an optional flag: `--out` to write the files data into a seperate file:
```
$ node step3.js --out new.txt one.txt
$ # no output, but new.txt contains contents of one.txt

$ node step3.js --out new.txt  http://google.com
$ # no output, but new.txt contains google's HTML
```

## Requirements
You may need to use these to run the scripts.
- [Node](https://nodejs.org/en)


## Development
This App was made using a WSL Ubunto distro running from a VS Code desktop environment.
Here are some extensions i use:
- [Prettier](https://prettier.io/) : [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)


[Previous Repo]: https://github.com/papontem/33_3_JS_Async_Code_Await_Exercise