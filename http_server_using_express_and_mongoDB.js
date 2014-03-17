/* Becuase we will be reading some file we need file system module */
var fs = require("fs");

/* Log that we are starting */
console.log("Starting");

/* Using JSON config file to define host and port */
var config = JSON.parse(fs.readFileSync("config_host.json"));
var host = config.host;
var port = config.port;

//Including the namespace we still have to access classes
var mongo = require("mongodb");

//Choose our host and port
var dbHost = "127.0.0.1";
//Get port from Connection (listening information) 
var dbPort = mongo.Connection.DEFAULT_PORT;


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

/* Using ID to search for page and then request user specific page */
app.get("/user/:id",function (request,response){
	
	getUser(request.params.id,function(user){
		if(!user){
			response.send("Can't find user :(",404);
		}else{
			response.send("<a href='http://twitter.com/"+user.twitter+"'>Follow " + user.name + " on twitter</a>");
		}
	});
});

/* Similar to http callback */
app.listen(port,host); 

//Wrapping this into a search function 
function getUser(id,callback){
	//Database variable which will store our connection details
	//mongo is connection Db is the class and node-js-intro is name of database
	//Then we need to pass the server to connect to then we will use mongo namespace and class called Server
	var db = new mongo.Db("node-js-intro",new mongo.Server(dbHost,dbPort,{}) );

	//open the connection. This accepts one argument that is callback 
	db.open(function(error){
		console.log("We are connected to : " + dbHost + ":" + dbPort);
		//Specify collection - similar to a table RDBMS, user table
		db.collection("user",function(error,collection){
			console.log("we have the collection");
			//user collection is ready to use 
			//Searching (cursor is for iterating over the results)
			//Specifying the column we are looking at (id)
			collection.find({"id":id.toString()},function(error,cursor){
				//Save result in normal javascript array
				cursor.toArray(function(error,users){
					if(users.length==0){
						//No user found!
						callback(false);
					}else{
						//Found user,Returning result
						callback(users[0]);
					}
				});
			});
		});
	});
}
