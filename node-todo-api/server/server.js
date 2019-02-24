var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID }=require('mongodb');
const _=require('lodash');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var {authenticate}=require("./middleware/authenicate")

var app = express();

const port=process.env.PORT||3000;


app.use(bodyParser.json());//midllware=>return value of this method is middl.. here
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e); //httpstatus.com
    })
});
// body pasrse takes json and convert into obj

app.get('/todos',(req,res) => {
    Todo.find().then((todos)=>{
        console.log("data sent : ")
        res.send({
            todos// we could have sent array but we will lock our self we will not be able to add things in response in future...so use obj

        }), (e)=>{
            console.log("error ", e);
            res.status(400).send(e);
        }
})
});


app.get("/todos/:id",(req,res)=>{
   // req.params
   var id=req.params.id;
   
   if(!ObjectID.isValid(id))
   {
       return res.status(404).send("invalid id");
   }
    Todo.findById(id).then((todo)=>{
        if(!todo)
        {
            return res.status(400).send("id does not exist id");
        }
        return res.send(todo)

    },(e)=>{
        console.log("error : ",e);
        return res.status(400).send("error");
    }).catch((e)=>{
        return res.status(400).send("error");
    })
})


app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
   
   if(!ObjectID.isValid(id))
   {
       return res.status(400).send("invalid id");
   }
   Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo)
       return res.status(400).send();
       return res.send(todo);
   }).catch((e)=>{
       res.status(400).send();
   })
})


app.patch('./todos/:id',(req,res)=>{
    var id=req.params.id;
   
   if(!ObjectID.isValid(id))
   {
       return res.status(400).send("invalid id");
   }
   
})





app.post("/users",(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);

    console.log("body----- :------ ",body);

    user.save().then(()=>{
        return user.generateAuthToken(); // returning it just like in user model.. for chaining promise.. an tag a antother then call
        //res.send(user);


    }).then((token)=>{
        // in header..pass key and values
        res.header("x-auth",token).send(user) // x-auth for custorm header... when we prefix a header it means it is a custom header
    }).catch((e)=>{// this then call is because we return a value fron above then call
        console.log("error : ",console.error());
        res.status(400).send(e);
    })
})

const jwt =require('jsonwebtoken');

var data={
    id:10
};

var token=jwt.sign(data,'abc123'); //1st obj..2nd secret


app.get("/jwt",(req,res)=>{
res.send(token);
})





app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user);

})




















 app.listen(port,()=>{
     console.log(`started on port ${3000}`);
 })



 //we need to tell heroku how to start the app..start script
 // also we nedd to tell which version of node to use..default is v5... we are using v6 ... let it know ...