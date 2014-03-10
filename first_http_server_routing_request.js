/* Very basic static page HTTP server that will respond with the diferent text for every request . 
When the URL matches select file to be returned to the user,But if the request doesn't match the file 404 should be returned */

/* Including HTTP module */
var http = require("http");

/* Becuase we will be reading some file we need file system module */
var fs = require("fs");

/* Log that we are starting */
console.log("Starting");

/* Using JSON config file to define host and port */
var config = JSON.parse(fs.readFileSync("config_host.json"));
var host = config.host;
var port = config.port;

/* Listen on a port and host */
/* Declaring host */
//var host = "127.0.0.1";
//var port = 1337;

/* Creating our server using http.createServer method with callBack argument . */
/* This callback is fired everytime the page is requested. No matter which page it is.*/
/* Request contains the information about the URL, the person requested and headers */
/* Response is the object where we need to send our response. We can add some text and as soon as we send it will get sent to the client */ 
var server = http.createServer(function (request,response){
	/* Log that we received a request . We are printing actual URL */
	console.log("Received request : " + request.url);

	/* Reading the file */
	fs.readFile("./public"+request.url , function(error,data){
		if(error){
			/* Writing some header. If everything is ok return 200 then we return an object containing headers */
			response.writeHead(404,{"Content-type":"text/plain"});
			/* Write some content */
			response.write("Sorry the page was not found");
			/* Connection will stay open and to the user it will look like the page is still loading until we send end*/
			response.end();
		}else{
			/* Writing some header. If everything is ok return 200 then we return an object containing headers */
			response.writeHead(200,{"Content-type":"text/html"});
			/* Write some content */
			response.write(data);
			/* Connection will stay open and to the user it will look like the page is still loading until we send end*/
			response.end();
		}
	})
});

/* Listening we add port then host and we can use extra callback*/
server.listen(port,host,function(){
	/* We will get told as soon as the server is actually listening */
	console.log("Listening" + host + ":" + port);

});

/* Changing the port at runtime whithout restarting server */
fs.watchFile("config_host.json",function(){
	config = JSON.parse(fs.readFileSync("config_host.json"));
	host = config.host;
	port = config.port;
	/* Stop server listning on old port */
	server.close();
	/* Start server listning on new port */
	/* Listening we add port then host and we can use extra callback*/
	server.listen(port,host,function(){
		/* We will get told as soon as the server is actually listening */
		console.log("Listening" + host + ":" + port);

	});
});

/* After this goto browser and type 127.0.0.1:1337 in URL and we will receive a request */