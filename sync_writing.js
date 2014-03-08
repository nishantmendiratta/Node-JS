/* Including file system module */
var fs = require("fs");

/* Printing message before execution */
console.log("Starting");

/*This takes two arguments first argument is the location of file and second argument is what actually is going into the file */
fs.writeFileSync("wite_on_file.txt", "Hello World ! Synchrounous");

/* Printing message after execution */
console.log("Finished !");