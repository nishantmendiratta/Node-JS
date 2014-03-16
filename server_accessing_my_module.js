/*Accessing function*/
var myModule = require("./my_module.js");
console.log("First module message : " + myModule.helloworld());
console.log("Second module message : " + myModule.helloworldagain());
console.log("Third module message : " + myModule.privatefunctionincrement(1));