//Including the namespace we still have to access classes
var mongo = require("mongodb");

//Choose our host and port
var host = "127.0.0.1";
//Get port from Connection (listening information) 
var port = mongo.Connection.DEFAULT_PORT;

//Wrapping this into a search function 
function getUser(id,callback){
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


getUser(1,function(user){
	if(!user){
		console.log("No user found!");
	}else{
		console.log("Found a user : " , user);
	}
});