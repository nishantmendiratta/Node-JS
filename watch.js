/* Including a file system object */
var fs = require("fs");

/* Show message on console before execution */
console.log("Starting");

/* Reading our configuration file synchronously */
var config = JSON.parse(fs.readFileSync("config.json"));

/* Printing config */
console.log(config);

/* Watch the file so one knows when it's being updated */
/* Includes two arguments 1- Location of file , 2- Callback function */
/* Call back function returns current and previous statastics , When this callback get called the file is being updated*/
fs.watchFile("config.json",function (current,previous){
	/* Reading configuration again */
	console.log("Configuration changed : ");
	/* Reading our configuration file synchronously */
	var config = JSON.parse(fs.readFileSync("config.json"));
	/* Priting changed content */
	console.log("New content : " + config );
});