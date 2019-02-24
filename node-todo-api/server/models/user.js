var mongoose = require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs')

var UserSchema=new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
})

// this method we are overriding...noramally it gives all data...now we want it to give sprecific property only

UserSchema.methods.toJSON = function (){
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['_id','email'])
}
// Hey David,

// Great question. It's automatically called when we respond to the express request with res.send. That converts our object to a string by calling JSON.stringify. JSON.stringify is what calls toJSON. Here's an isolated example: 

// var obj = {
//   publicKey: 'Andrew',
//   privateKey: 'mypass'
// };
 
// obj.toJSON = function () {
//   return {
//     publicKey: this.publicKey
//   };
// };
 
// console.log(JSON.stringify(obj)); // This output will only include the publicKey
// - Andrew

UserSchema.methods.generateAuthToken=function (){
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  // toString is a method available to all objects in JavaScript natively. They just overrode its behavior so the can't control the output to something that is compatible with what the library expects.
  // refer mongoose docs 
  //1st obj we want to sign, 2nd secret
  //user.tokens.push({access,token});
  user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  })
  // we we chain this with another then thats why returing...useually we return a promise for that...try it multiple time.... this.is also legal... the value returned will be passed as sucess arg in next then call.
  // we will evntually move this secret value somewhere else

}

UserSchema.methods.removeToken= function (token) {
  var user=this;
 return user.update({
    $pull:{
      tokens:{
        token:token
      }
    }
  });
};
// $pull is for removeing the property that matches... it is mongoose fn
// not just the token but it will remove the entire obj
UserSchema.statics.findByToken=function(token){
var User=this;
var decoded;

try{
  console.log("decoding....");
  decoded=jwt.verify(token,'abc123');
  console.log("decoded : ", decoded);
} catch(e){
  // return new Promise((resolve,reject)=>{
  //   reject();
  // })
  return Promise.reject();// same as above..short
}
  return User.findOne({
    '_id': decoded._id,// we can leave id without '' also 
    'tokens.token':token, // nested document passed in ''
    'tokens.access':'auth'
  })

}


UserSchema.statics.findByCredentials=function (email,password) {
  var User=this;

  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
// bcrypt only support callbacks..we can use that but as we have used propmises in our whole app so will keep using promise by returning new.... 
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          resolve(user);
        }else{
          return reject();
        }
        
      })
    })

  })
};



UserSchema.pre('save',function (next){
  var user=this;
// if is for checking if the pass is modified..otherwise it will run on every save operation..and slow down ,creash our app
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password, salt,(err,hash)=>{
          user.password=hash;
          next();
      })
  })
  }else{
    next();
  }
})










// we cannot stick method to user model so we are generating User Schema..it is identical to user model
// pass the schema in mongoose.model..this will not change the functionality of our app

var User = mongoose.model('User', UserSchema);

module.exports = {User}













































// Adam — Teaching Assistant · 3 days ago
// Hi Ruesi,

// Sure, that works. Returning in a .then() method allows you to chain another .then() onto it and access the return value so instead of nesting Promises like you are here:

// user.save()
//     .then(() => {
//         user.generateAuthToken() //drop return and call the function
//             .then((token) => {
//                 res.header('x-auth', token).send(user);
//             })
// You can flatten out the structure:

// user.save()
//     .then(() => {
//         return user.generateAuthToken()
//     })
//     .then((token) => {
//         res.header('x-auth', token).send(user);
//     })
// And it reads as a simple series of steps. One of the main benefits of Promises is to avoid that pyramid structure that flows off to the right like that which is really hard to read and debug.












// const x=
// {
//   email:"pankaj@gmail.com",
//   password:"asdas",
//   tokens:[{
//     access:"auth",
//     token:"sdhdskhfkshdkfhkdshfk"
//   }]
// }
// tokens is an array of object..each obj is login token
// we are setting only auth type..access specity : token type.. can be restting,email
// toke value we use this for 

// const mongoose = require('mongoose');
// const validator = require('validator');

// {
//   email: 'andrew@example.com',
//   password: 'adpsofijasdfmpoijwerew',
//   tokens: [{
//     access: 'auth',
//     token: 'poijasdpfoimasdpfjiweproijwer'
//   }]
// }










// var User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//     unique:true,
//     validate:{
//       validator:validator.isEmail,
//       message:'{VALUE} is not a valid emial'
//     },
//     password:{
//       type:String,
//       required:true,
//       minlength:6
//     },
//     tokens:[{
//       access:{
//         type:String,
//         required:true
//       },
//       token:{
//         type:String,
//         required:true
//       }
//     }]
//   }
// });
// // go to costom validator in mongoose validator oc
// module.exports = {User}
