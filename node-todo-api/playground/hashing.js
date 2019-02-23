const { SHA256}=require('crypto-js');
const fs=require('fs')
// var message="I am user number 3";

// var hash=SHA256(message).toString();// rsult will be object so converting to string

// console.log(`message :${message}`);
// console.log(`message :${hash}`);

// using sha256 we have to use if else... for hashing, rehashing...converting and varifying that nothing changed....it little combersome... we will use jsonwebtoke...which simply gives two method 



const jwt =require('jsonwebtoken');

var data={
    id:10
};

var token=jwt.sign(data,'123abc'); //1st obj..2nd secret

console.log(token)


var decoded=jwt.verify(token+"1","123abc");

console.log("decoded : ", decoded);