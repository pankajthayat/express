const { SHA256}=require('crypto-js');

var message="I am user number 3";

var hash=SHA256(message).toString();// rsult will be object so converting to string

console.log(`message :${message}`);
console.log(`message :${hash}`);