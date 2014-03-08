
/* Including file system module */
var fs = require("fs");

/* Printing message on console before starting */
console.log("Starting");

/* Reading file by providing location of the file with callback function which takes two parameters error and the data. 
ERROR to show errors , DATA to get content of file */ 
fs.readFile("test.txt",function (error,data){
	console.log("Contents of file " + data);
});

/* Showing message on console */ 
console.log("Carry on executing");
