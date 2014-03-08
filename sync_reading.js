/* Including files system object */ 
var fs = require("fs");

/* Showing message on console */ 
console.log("Starting");

/* We don't have call back, data is returned from the function in a variable */ 
var content = fs.readFileSync("test.txt");

/* Printing content of file on console */ 
console.log("Contents of file " + content);

/* Showing message on console */ 
console.log("Carry on executing");
