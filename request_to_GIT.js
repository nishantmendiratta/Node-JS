/* For GIT we need to use https */
var https = require("https");

//Wrapping this code into a function to reuse it for different user and adding callback as it takes time to get response
function getRepos(username , callback){
	/* We have to pass some options into the request,Creating a seperate object for that*/
	var options = {
		host: 'api.github.com',
		path: '/users/' + username + '/repos', // From API Documentation http://developer.github.com/v3/ || Goto-> Repositories -> List user repositories 
		method: 'GET',
		//Request requires user-agent
		headers: { 
	    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
		}
	};

	/* Create our request and get response */
	var request = https.request(options,function (response){

		var body = '';
		//Getting data in chunks and concatinating it to create data object (JSON)
		response.on("data",function(chunk){
			body+= chunk.toString('utf8');
		});

		response.on("end",function(){
			//Create a new array to get response 
			var repos = [];

			var json = JSON.parse(body);
			
			json.forEach(function(repo){
				repos.push({
					name: repo.name,
					description: repo.description
				});
			});

			//Passing result after receiving request
			callback(repos);

		});
	});

	//To finish our request 
	request.end();	
}


//Calling the above function to get repose 
getRepos("nishantmendiratta",function(repos){
	console.log("Nishant Mendiratta has " + repos.length + " repos");
	console.log("Repos : ", repos);
});