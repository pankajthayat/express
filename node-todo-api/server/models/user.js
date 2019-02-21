var mongoose = require('mongoose');
const validator=require('validator');
const x=
{
  email:"pankaj@gmail.com",
  password:"asdas",
  tokens:[{
    access:"auth",
    token:"sdhdskhfkshdkfhkdshfk"
  }]
}
// tokens is an array of object..each obj is login token
// we are setting only auth type..access specity : token type.. can be restting,email
// toke value we use this for 



var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique:true,
    validate:{
      validator:(value)=>{
          return validator.isEmail(value);
      },
      message:""
    }
  }
});
// go to costom validator in mongoose validator oc
module.exports = {User}
