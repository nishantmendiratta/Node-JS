//Including the namespace we still have to access classes
var mongo = require("mongodb");

//Choose our host and port
var host = "127.0.0.1";
//Get port from Connection (listening information) 
var port = mongo.Connection.DEFAULT_PORT;

//Database variable which will store our connection details
//mongo is connection Db is the class and node-js-intro is name of database
//Then we need to pass the server to connect to then we will use mongo namespace and class called Server
var db = new mongo.Db("node-js-intro",new mongo.Server(host,port,{}) );

//open the connection. This accepts one argument that is callback 
db.open(function(error){
	console.log("We are connected to : " + host + ":" + port);
	//Specify collection - similar to a table RDBMS, user table
	db.collection("user",function(error,collection){
		console.log("we have the collection");
		//user collection is ready to use 
		//Insert some data
		collection.insert({
			//Inserting arbitary object
			id: "1",
			name : "Nishant Mendiratta",
			twitter : "MrMendiratta",
			email :  "nishuarora.nishant@gmail.com"
		},function(){
			console.log("Successfully inserted Nishant Mendiratta")
		});
		collection.insert({
			//Inserting another arbitary object
			id: "2",
			name : "Kush Mendiratta",
			twitter : "KMendiratta",
			email :  "kush@gmail.com"
		},function(){
			console.log("Successfully inserted Kush Mendiratta")
		});

	});
});

//Using very simple insert script 