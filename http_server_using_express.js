/* Becuase we will be reading some file we need file system module */
var fs = require("fs");

/* Log that we are starting */
console.log("Starting");

/* Using JSON config file to define host and port */
var config = JSON.parse(fs.readFileSync("config_host.json"));
var host = config.host;
var port = config.port;

/* Including express framework */
var express = require("express");

/* Creating server */
var app = express();

/* Checking router before looking for static file */
app.use(app.router);

/* Using static files by specifying current working directory */
app.use(express.static(__dirname + "/public"));

/* Specify individual paths and each path will have it's own callback */
/* Root path */
app.get("/",function (request,response){
	response.send("hello!");
});

/* Sending parameters in the URL */
app.get("/hello/:text",function (request,response){
	response.send(request.params.text);
});


var users = {
	"1":{
		"name":"nishant mendiratta",
		"twitter":"Mrmendiratta"
	},
	"2":{
		"name":"blood connection",
		"twitter":"bloodkonnection"
	}
};

/* Using ID to search for page and then request user specific page */
app.get("/user/:id",function (request,response){
	var user = users[request.params.id];
	if(user){
		response.send("<a href='http://twitter.com/"+user.twitter+"'>Follow " + user.name + " on twitter</a>");
	}else{
		response.send("Can't find user :(",404);
	}
});

/* Similar to http callback */
app.listen(port,host); 
