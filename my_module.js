function hello(){
	return "world";
}

function helloAgain(){
	return hello() + " again";
}

function myPrivateFunction(number){
	return number + 1;
}

function increment(number){
	return myPrivateFunction(number);
}
//Explicitly declaring objectes to be used publically
module.exports.helloworld = hello;
module.exports.helloworldagain = helloAgain;
module.exports.privatefunctionincrement = increment;