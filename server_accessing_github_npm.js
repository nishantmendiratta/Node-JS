//Including project 
var github = require("nishantmendiratta-github-example");

//Accessomg the module
github.github("nishantmendiratta",function(repos){
	console.log("Nishant Mendiratta's Repos", repos);
});