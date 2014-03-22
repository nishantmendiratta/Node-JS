/* Becuase we will be reading some file we need file system module */
var fs = require("fs");

//Including twit npm module
var Twit = require('twit')

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

/* Specify individual paths and each path will have it's own callback */
/* Root path */
app.get("/",function (request,response){
	//Reading contents of html file
	var content = fs.readFileSync("template.html");

	//get tweets
	getTweets(function(tweets){
		var ul = '';
		//Creating an unordered list with tweets 
		tweets.forEach(function(tweet){
			ul += '<li><strong>' + tweet.user.screen_name + ": </strong>" + tweet.text + "</li>";
		});
		//Assigning back to itself 
		content = content.toString("utf8").replace("{{INITIAL_TWEETS}}",ul);
		//Set custom header
		response.setHeader("Content-type","text/html");
		response.send(content);
	});
});


/* Similar to http callback */
//app.listen(port,host); 
//EXPRESS API has been changed reference http://stackoverflow.com/questions/10191048/socket-io-js-not-found
var http = require('http');

var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(port);

/* Above code working fine now socket.io working fine */
//using socket io with express web server
//var io = require('socket.io').listen(app);

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

//Variable to store table name
var tweetCollection;

db.open(function(error){
	console.log("We are connected to : " + host + ":" + port);

	//Selecting a table 
	db.collection("tweet",function(error,collection){
		tweetCollection = collection;
	});
});

//function to get last 10 tweets
function getTweets(callback){
	//Adding empty object {} as we want all the results
	tweetCollection.find({},{"limit":10,"sort":{"_id":-1}},function(error,cursor){
		cursor.toArray(function(error,tweets){
			callback(tweets);
		});
	});
}

/* Code that connect with twitter and streams data into database */

//Getting tweets at runtime
//Refering to table name
var tweetCollection;


//Defining access tokens, Get this by creating new twitter application
var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

//Creating a request variable and using stream function 
var request = T.stream('statuses/filter', { track: 'bieber' })

//Printing tweets related to bieber on a screen 
request.on('tweet', function (tweet) {
	//Every client which is connected to our website is included in sockets
	//emit is to send data to client,We supplied tweet(json) as js object
	//Sockets will serialise tweet which is deserialised at client(template.html)
	io.sockets.emit("tweet",tweet);
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
