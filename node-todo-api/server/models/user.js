var mongoose = require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ = require('lodash');

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

UserSchema.methods.generateAuthToken=function (){
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    //1st obj we want to sign, 2nd secret
  //user.tokens.push({access,token});
  user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  })
  // we we chain this with another then thats why returing...useually we return a promise for that...try it multiple time.... this.is also legal... the value returned will be passed as sucess arg in next then call.
  // we will evntually move this secret value somewhere else

}

// we cannot stick method to user model so we are generating User Schema..it is identical to user model
// pass the schema in mongoose.model..this will not change the functionality of our app

var User = mongoose.model('User', UserSchema);

module.exports = {User}














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
