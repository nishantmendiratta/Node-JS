/* Including file system module */
var fs = require("fs");

/* Printing message on console */
console.log("Starting");

/* Best format to crate config file as it's easily translated into a javascript object */
/* Reading content of file synchronously , Reference our config file */
var content = fs.readFileSync("config.json");

/* This will show a string we can't do anything with this we need to parse it */
console.log("Content" + content);

/* Easy utility for parsing , Takes string for of JSON object and pass it into a normal object */
var config = JSON.parse(content);

/* Printing javascript object on screen */
console.log("Config : " + config);

/* Printing value from JSON using object */
console.log("Username : " + config.username);

/* Execute rest of code */
console.log("Carry on executing");
