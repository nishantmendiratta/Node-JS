
//Including twit npm module
var Twit = require('twit')

//Defining access tokens, Get this by creating new twitter application
var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

//Including the namespace we still have to access classes
var mongo = require("mongodb");

//Choose our host and port
var dbHost = "127.0.0.1";
//Get port from Connection (listening information) 
var dbPort = mongo.Connection.DEFAULT_PORT;

//Database variable which will store our connection details
//mongo is connection Db is the class and node-js-intro is name of database
//Then we need to pass the server to connect to then we will use mongo namespace and class called Server
var db = new mongo.Db("node-js-intro",new mongo.Server(dbHost,dbPort,{}) );

//Refering to table name
var tweetCollection;

db.open(function(error){
	console.log("Connected to : " + dbHost + ":" + dbPort);
	//Creating a table 
	db.collection("tweet",function(error,collection){
		//Inserting table into object
		tweetCollection = collection;
	});
});

//Creating a request variable and using stream function 
var request = T.stream('statuses/filter', { track: 'bieber' })

//Printing tweets related to bieber on a screen 
request.on('tweet', function (tweet) {
	tweetCollection.insert(tweet,function(error){
		if(error){
			console.log(error);
		}else{
			console.log("Inserted into database");
		}
	});
	console.log(tweet.text);
	console.log("\n");
})

request.end(); 

