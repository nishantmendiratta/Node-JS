var childProcess = require("child_process");

//Instances of our twitter_streaming_api_require_launch_script file 
var children = [];

//Two seperate twitter scripts launch each of the following arg changed
var keywords = [
	["bieber","d2sb6mwSTqpOD09RS7SkBg","OmG7emgrJsXtuZslduxxwjZUXBGIs5S4mtRu9JTvLA","549214259-LXDwPqfZ9rf3JTbeW4soAqqmVcko7MZy4E6pNlrz","KLlMCShFeaoYM7A50OqdKbRiY8wwDNTMYjN8r1IXXlM"],
	["euro2012","d2sb6mwSTqpOD09RS7SkBg","OmG7emgrJsXtuZslduxxwjZUXBGIs5S4mtRu9JTvLA","549214259-LXDwPqfZ9rf3JTbeW4soAqqmVcko7MZy4E6pNlrz","KLlMCShFeaoYM7A50OqdKbRiY8wwDNTMYjN8r1IXXlM"]
];


//Spawn these above two 
//Loop through each of these keywords
keywords.forEach(function(keywordData){
	//__dirname to specify our current directory
	//1st arg is location of file , keywodData ASAP this will run our process will spawn
	var child = childProcess.fork(__dirname + "/twitter_streaming_api_require_launch_script.js",keywordData);

	//Exit event
	child.on("exit",function(){
		console.log(keywordData[0] + " : died :("); 
	});

	//Analysis for message event,Child process can send custom message back
	child.on("message",function(text){
		console.log(keywordData[0] + " : "+ text);
	});

	//Push it into an array
	children.push(child); 
});

//When we close our launch script we also want to close our tweet collection processing 
//Listen for these processes exit event,This is fired just before the program is finished
process.on("exit",function(){
	//Loop through each of the children
	children.forEach(function(child){
		//Using kill method to kill each of the children
		child.kill();
	});
});