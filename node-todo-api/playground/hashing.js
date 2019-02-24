const { SHA256}=require('crypto-js');
const jwt =require('jsonwebtoken');

const bcrypt=require('bcryptjs');

var password='123abc';
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt,(err,hash)=>{
        console.log(hash);
    })
})//1st number of rounds we want..its asyn fun...inherently slow...the bigger the num ...the slow...adding bigger num will slow down ...but for password we can take this...so that no one can brute force

var hashedPassword="";


bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res)// this fn is to compare the hashed asn palin pass...res contain the result
})


































// var message="I am user number 3";

// var hash=SHA256(message).toString();// rsult will be object so converting to string

// console.log(`message :${message}`);
// console.log(`message :${hash}`);

// using sha256 we have to use if else... for hashing, rehashing...converting and varifying that nothing changed....it little combersome... we will use jsonwebtoke...which simply gives two method 



// 

// var data={
//     id:10
// };

// var token=jwt.sign(data,'123abc'); //1st obj..2nd secret

// console.log(token)


// var decoded=jwt.verify(token+"1","123abc");

// console.log("decoded : ", decoded);