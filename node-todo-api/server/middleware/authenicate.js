
var {User} =require("./../models/user")

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');// jsut pass the key..of value we want to fetch from header

    User.findByToken(token).then((user)=>{
        if(!user)
        {
            return Promise.reject();
            //res.status(401).send();
        }
        req.user=user;
        req.token=token;
        next();// to start the 3rd fun down below
       // res.send(user);
    }).catch((e)=>{
        res.status(401).send();
    });
};


module.exports={authenticate};