/* Including file system module */
var fs = require("fs");

/* Printing message before execution */
console.log("Starting");

/*This takes three arguments first argument is the location of file and second argument is what actually is going into the file ,
and a call back at the end */
fs.writeFile("wite_on_file.txt", "Hello World ! ASynchrounous",function (error){
	console.log("Written File");
});

/* Printing message after execution */
console.log("Finished !");